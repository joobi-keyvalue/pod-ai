from database import get_connection
from tools.news import fetch_news_articles
from tools.tavily import fetch_content
from tools.openai import summarize_topic
from tools.reddit import fetch_reddit_urls
from tools.openai import script_generator, convert_to_ssml


def create_topic_summary():
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM topic")
        topics = cursor.fetchall()

        for topic in topics:
            # Assuming topic[1] is the topic name
            if topic[1] != "Reddit":
                urls = fetch_news_articles(topic[1])[:3]
                raw_data = fetch_content(topic[1], urls)
                summary = summarize_topic(topic[1], raw_data)

                # Insert summary into the summary table
                insert_query = """
                INSERT INTO public.summary (summary_id, summary, "date", topic_id)
                VALUES (nextval('summary_summary_id_seq'::regclass), %s, NOW(), %s);
                """
                cursor.execute(insert_query, (summary, topic[0]))  # topic[0] is assumed to be topic_id
        
        # Commit changes to the database
        connection.commit()

    except Exception as e:
        print(f"Error occurred: {e}")
        connection.rollback()  # Rollback in case of error

    finally:
        cursor.close()
        connection.close()

    return topics


def create_reddit_user_summary():
    connection = get_connection()
    cursor = connection.cursor()

    try:
        # SQL query to fetch user IDs with 'reddit' topic
        query = """
        SELECT ut.user_id, t.id AS topic_id
        FROM public.user_topic ut
        JOIN public.topic t ON ut.topic_id = t.id
        WHERE LOWER(t.name) = 'reddit';
        """
        
        cursor.execute(query)
        users_with_reddit = cursor.fetchall()

        # Check if any users are found
        if users_with_reddit:
            for user_data in users_with_reddit:
                user_id = user_data[0]  # Fetch user_id
                topic_id = user_data[1]  # Fetch topic_id
                
                # Fetch Reddit URLs and content
                urls = fetch_reddit_urls()[:3]
                raw_data = fetch_content("", urls)
                summary = summarize_topic("", raw_data)

                # Insert summary into the personalized_summary table
                insert_query = """
                INSERT INTO public.personalized_summary 
                (id, summary, "date", topic_id, user_id)
                VALUES (nextval('personalized_summary_id_seq'::regclass), %s, NOW(), %s, %s);
                """
                cursor.execute(insert_query, (summary, topic_id, user_id))
            
            # Commit the transaction
            connection.commit()
        else:
            print("No users found with the 'reddit' topic.")

    except Exception as e:
        print(f"Error occurred: {e}")
        connection.rollback()  # Rollback transaction if there is an error

    finally:
        cursor.close()
        connection.close()



def create_podcast_for_users():
    connection = get_connection()
    cursor = connection.cursor()

    try:
        # SQL query to get all user_ids from user_topic table
        user_query = """
        SELECT DISTINCT ut.user_id
        FROM public.user_topic ut;
        """
        
        cursor.execute(user_query)
        user_ids = cursor.fetchall()

        if user_ids:
            for user_data in user_ids:
                user_id = user_data[0]

                # Fetch topic IDs for the user
                topic_query = """
                SELECT ut.topic_id
                FROM public.user_topic ut
                WHERE ut.user_id = %s;
                """
                cursor.execute(topic_query, (user_id,))
                topic_ids = cursor.fetchall()

                combined_summaries = []

                # Fetch summaries from personalized_summary for the current date
                if topic_ids:
                    for topic in topic_ids:
                        topic_id = topic[0]

                        # Fetch from personalized_summary
                        personalized_summary_query = """
                        SELECT summary
                        FROM public.personalized_summary
                        WHERE user_id = %s AND topic_id = %s AND "date" = CURRENT_DATE;
                        """
                        cursor.execute(personalized_summary_query, (user_id, topic_id))
                        personalized_summary_result = cursor.fetchone()

                        if personalized_summary_result:
                            combined_summaries.append(personalized_summary_result[0])

                        # Fetch from summary table
                        summary_query = """
                        SELECT summary
                        FROM public.summary
                        WHERE topic_id = %s AND "date" = CURRENT_DATE;
                        """
                        cursor.execute(summary_query, (topic_id,))
                        summary_result = cursor.fetchone()

                        if summary_result:
                            combined_summaries.append(summary_result[0])

                # Combine all summaries for the user
                if combined_summaries:
                    final_combined_summary = " ".join(combined_summaries)
                    # Call create_podcast function with the combined summaries and user_id
                    transcript = script_generator(final_combined_summary)
                    ssml = convert_to_ssml(transcript)
                    insert_query = """
                    INSERT INTO public.podcast
                    (   podcast_id, title, script, transcript, "date", user_id, is_liked, audio_link)
                    VALUES (nextval('podcast_podcast_id_seq'::regclass), '', %s, %s, CURRENT_DATE, %s, false, '');
                    """
                    cursor.execute(insert_query, (ssml, transcript, user_id))
                    connection.commit()  # Commit the changes to the database
                else:
                    print(f"No summaries found for User {user_id} for the current date.")

        else:
            print("No users found.")

    except Exception as e:
        print(f"Error occurred: {e}")
        connection.rollback()  # Rollback transaction if there is an error

    finally:
        cursor.close()
        connection.close()
