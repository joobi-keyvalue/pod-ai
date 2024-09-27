from tavily import TavilyClient
import os
from dotenv import load_dotenv


load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

def fetch_content(urls):
        all_raw_content = ""
        
        response = tavily_client.extract(urls=urls)

        for result in response["results"]:
                print(f"URL: {result['url']}")   
                all_raw_content += f"{result['raw_content']}\n"
        