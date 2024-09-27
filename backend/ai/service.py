from database import get_connection
import datetime
from tools.news import fetch_news_articles
from tools.tavily import fetch_content
from tools.openai import summarize_topic
from tools.reddit import fetch_reddit_urls
from tools.openai import script_generator, convert_to_ssml
import requests


today = datetime.datetime.now()


def create_podcast_for_new_user(user_id):
    create_topic_summary()
    create_reddit_user_summary(user_id)
    create_podcast_for_users(user_id)
    requests.post("https://194d-103-138-236-18.ngrok-free.app/generate-tts")


def create_topic_summary():
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM topic")
        topics = cursor.fetchall()

        for topic in topics:

            if topic[1] != "Reddit":
                check_query = """
                SELECT 1 FROM public.summary 
                WHERE topic_id = %s AND "date"::date = NOW()::date;
                """
                cursor.execute(check_query, (topic[0],))
                summary_exists = cursor.fetchone()

                if not summary_exists:
                    urls = fetch_news_articles(topic[1])[:3]
                    raw_data = fetch_content(topic[1], urls)
                    summary = summarize_topic(topic[1], raw_data)

                    # Insert summary into the summary table
                    insert_query = """
                    INSERT INTO public.summary (summary_id, summary, "date", topic_id)
                    VALUES (nextval('summary_summary_id_seq'::regclass), %s, NOW(), %s)
                    RETURNING summary_id;;
                    """
                    cursor.execute(insert_query, (summary, topic[0]))  # topic[0] is assumed to be topic_id

                    summary_id = cursor.fetchone()[0]  # Get the inserted summary_id

                    # Insert URLs into the source table
                    insert_source_query = """
                    INSERT INTO public.source (source_id, source_url, summary_id)
                    VALUES (nextval('source_source_id_seq'::regclass), %s, %s);
                    """
                    for url in urls:
                        cursor.execute(insert_source_query, (url, summary_id))
                else: 
                    print(f"Summary already exists for {topic[1]} topic. on {(today.strftime('%Y-%m-%d'))}")
            
        # Commit changes to the database
        connection.commit()

    except Exception as e:
        print(f"Error occurred: {e}")
        connection.rollback()  # Rollback in case of error

    finally:
        cursor.close()
        connection.close()

    return topics


def create_reddit_user_summary(userid = None):
    connection = get_connection()
    cursor = connection.cursor()

    try:

        if userid:
            check_user_in_reddit = """
            SELECT ut.user_id, ut.topic_id FROM public.user_topic ut
            WHERE user_id = %s AND topic_id = (SELECT id FROM public.topic WHERE name = 'Reddit');
            """
            cursor.execute(check_user_in_reddit, (userid,))
            user_exists = cursor.fetchone()
            if(user_exists):
                users_with_reddit = [user_exists]
            else:
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

                check_query = """
                SELECT 1 FROM public.personalized_summary 
                WHERE user_id = %s AND topic_id = %s AND "date"::date = NOW()::date;
                """
                cursor.execute(check_query, (user_id, topic_id))
                summary_exists = cursor.fetchone()

                if not summary_exists:
                
                    # Fetch Reddit URLs and content
                    urls = fetch_reddit_urls()[:3]
                    raw_data = fetch_content("", urls)
                    summary = summarize_topic("", raw_data)

                    # Insert summary into the personalized_summary table
                    insert_query = """
                    INSERT INTO public.personalized_summary 
                    (id, summary, "date", topic_id, user_id)
                    VALUES (nextval('personalized_summary_id_seq'::regclass), %s, NOW(), %s, %s)
                    RETURNING summary_id;;
                    """
                    cursor.execute(insert_query, (summary, topic_id, user_id))
                    summary_id = cursor.fetchone()[0]  # Get the inserted summary_id

                    # Insert URLs into the source table
                    insert_source_query = """
                    INSERT INTO public.source (source_id, source_url, summary_id)
                    VALUES (nextval('source_source_id_seq'::regclass), %s, %s);
                    """
                    for url in urls:
                        cursor.execute(insert_source_query, (url, summary_id))
                else:
                    print(f"Summary already exists for Reddit topic for User {user_id} on {(today.strftime('%Y-%m-%d'))}")
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



def create_podcast_for_users(user_id=None):
    connection = get_connection()
    cursor = connection.cursor()

    try:
        # SQL query to get all user_ids from user_topic table
        if not user_id:
            user_query = """
            SELECT DISTINCT ut.user_id
            FROM public.user_topic ut;
            """
            
            cursor.execute(user_query)
            user_ids = cursor.fetchall()
        else:
            user_ids = [(user_id,)]

        if user_ids:
            for user_data in user_ids:
                user_id = user_data[0]

                podcast_check_query = """
                SELECT 1 
                FROM public.podcast 
                WHERE user_id = %s AND "date" = CURRENT_DATE;
                """
                cursor.execute(podcast_check_query, (user_id,))
                podcast_exists = cursor.fetchone()

                if not podcast_exists:

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
