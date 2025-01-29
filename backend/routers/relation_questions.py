from fastapi import APIRouter, HTTPException
from random import choice
from database.relation_database import relation_db

router = APIRouter()

@router.get("/")
async def get_random_question():
    """Fetch a random question from the Relation database."""
    questions_data = relation_db.get_questions()
    if not questions_data:
        raise HTTPException(status_code=500, detail="No questions available")

    return choice(questions_data)
