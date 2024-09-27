import requests
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
import os


load_dotenv()

# OAuth credentials
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
username = os.getenv("REDDIT_USERNAME")
password = os.getenv("PASSWORD")
user_agent = os.getenv("USER_AGENT")

reddit_oauth_token_url = os.getenv("REDDIT_OAUTH_TOKEN_URL")
reddit_api_url = os.getenv("REDDIT_API_URL")

def get_oauth_token():
    form_data = {
        "grant_type": "password",
        "username": username,
        "password": password,
    }
    headers = {
        "User-Agent": user_agent,
    }

    auth = HTTPBasicAuth(client_id, client_secret)

    response = requests.post(reddit_oauth_token_url, data=form_data, headers=headers, auth=auth)
    
    if response.status_code != 200:
        raise Exception(f"Error fetching token: {response.status_code} - {response.text}")

    token = response.json().get("access_token")
    
    if not token:
        raise Exception("Failed to retrieve access token")
    
    return token

def get_reddit_feed(token):
    headers = {
        "Authorization": f"bearer {token}",
        "User-Agent": user_agent,
    }

    response = requests.get(f"{reddit_api_url}/best", headers=headers)
    
    if response.status_code != 200:
        raise Exception(f"Error fetching Reddit feed: {response.status_code} - {response.text}")
    
    feed = response.json()
    posts = []
    urls = []

    for child in feed.get("data", {}).get("children", []):
        post_data = child.get("data", {})
        posts.append({
            "title": post_data.get("title"),
            "author": post_data.get("author"),
            "url": post_data.get("url")
        })
        urls.append(post_data.get("url"))
        print(urls)

    return urls



def fetch_reddit_urls():
    token = get_oauth_token()
    urls = get_reddit_feed(token)
    return urls