import json
import os

class PathfinderDatabase:
    def __init__(self):
        self.questions_data = []

    def load_questions(self):
        """Load questions from the JSON file into memory."""
        try:
            file_path = os.path.abspath("database/pathfinderdb.json")
            print(f"Attempting to load questions from: {file_path}")
            with open(file_path, "r") as file:
                self.questions_data = json.load(file)
                print(f"Loaded {len(self.questions_data)} questions.")
        except Exception as e:
            print(f"Error loading Pathfinder questions: {e}")
            self.questions_data = []

    def get_questions(self):
        """Return the loaded questions data."""
        return self.questions_data

    def get_question_by_id(self, question_id: int):
        """Retrieve a question by its ID."""
        return next((q for q in self.questions_data if q["id"] == question_id), None)

# Singleton instance
pathfinder_db = PathfinderDatabase()

def load_questions():
    pathfinder_db.load_questions()
