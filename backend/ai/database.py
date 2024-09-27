import psycopg2
import os
from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    connection = psycopg2.connect(DATABASE_URL)
    return connection
