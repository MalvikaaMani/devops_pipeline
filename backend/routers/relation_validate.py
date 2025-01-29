from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.relation_database import relation_db

router = APIRouter()

class RelationValidationRequest(BaseModel):
    question_id: int
    reflexive: bool
    symmetric: bool
    transitive: bool

@router.post("/validate_relation")
async def validate_relation(request: RelationValidationRequest):
    question = relation_db.get_question_by_id(request.question_id)
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Convert result values to Boolean
    expected_result = [bool(value) for value in question["result"]]

    # Compare user's answer with the expected answer
    user_response = [request.reflexive, request.symmetric, request.transitive]
    is_correct = user_response == expected_result

    return {"correct": is_correct, "correct_answers": expected_result}
