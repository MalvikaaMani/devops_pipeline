from pymongo import MongoClient

def get_database():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["users"]
    return db

def get_user_collection():
    db = get_database()
    return db["user_data"]  # Replace "users" with your collection name if different.