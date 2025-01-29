from fastapi import APIRouter, HTTPException
from database.pathfinder_database import pathfinder_db
from models.question_model import ValidationRequest

router = APIRouter()

@router.post("/")
async def validate_matrix(data: ValidationRequest):
    """Validate the user's submitted matrix."""
    question = pathfinder_db.get_question_by_id(data.id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    correct_matrix = question["question"]
    is_valid = data.matrix == correct_matrix
    return {"result": is_valid}
