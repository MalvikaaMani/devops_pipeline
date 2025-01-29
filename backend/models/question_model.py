from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: int
    n: int
    question: List[List[int]]
    question_text: str  # Add question text field

class ValidationRequest(BaseModel):
    id: int
    matrix: List[List[int]]
