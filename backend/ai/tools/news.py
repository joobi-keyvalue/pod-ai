from newsapi import NewsApiClient
import os
from dotenv import load_dotenv


load_dotenv()


newsapi_key = os.getenv("NEWS_API_KEY")
newsapi = NewsApiClient(api_key=newsapi_key)



def fetch_news_articles(query: str) -> list:
    print(os.getenv("NEWS_API_KEY"))
    print(query)
    """
    Fetch news articles based on a given query using NewsAPI.

    Args:
        query (str): Search query for news articles.

    Returns:
        list: A list of URLs of the news articles.
    """
    try:
        all_articles = newsapi.get_everything(q=query,
                                              language='en',
                                              page=1,
                                              sort_by='publishedAt')
        urls = [article['url'] for article in all_articles['articles']]
        print(urls)
        return urls
    except Exception as e:
        print(f"Error fetching articles: {e}")
        return []