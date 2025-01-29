import json
import os

class RelationDatabase:
    def __init__(self):
        self.questions_data = []
        self.load_questions()  # Load questions when the instance is created

    def load_questions(self):
        """Load questions from the JSON file into memory."""
        try:
            file_path = os.path.abspath("database/relationdb.json")
            print(f"Attempting to load questions from: {file_path}")
            with open(file_path, "r") as file:
                self.questions_data = json.load(file)
                print(f"Loaded {len(self.questions_data)} questions.")
        except Exception as e:
            print(f"Error loading Relation questions: {e}")
            self.questions_data = []

    def get_questions(self):
        """Return all questions."""
        return self.questions_data

    def get_question_by_id(self, question_id: int):
        """Retrieve a question by its ID."""
        return next((q for q in self.questions_data if q["id"] == question_id), None)

# Singleton instance
relation_db = RelationDatabase()

def get_question_by_id(question_id: int):
    return relation_db.get_question_by_id(question_id)
