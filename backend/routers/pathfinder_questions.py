from fastapi import APIRouter, HTTPException
from random import choice
from database.pathfinder_database import pathfinder_db
from models.question_model import Question

router = APIRouter()

@router.get("/", response_model=Question)
async def fetch_random_question():
    """Fetch a random question from the Pathfinder database."""
    questions_data = pathfinder_db.get_questions()
    if not questions_data:
        raise HTTPException(status_code=500, detail="No questions available")

    random_question = choice(questions_data)
    random_question["question_text"] = f"Adjacency Matrix:\n{random_question['question']}"
    return random_question
