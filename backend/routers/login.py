from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.connection import get_user_collection

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    date_of_birth: str

@router.post("/login")
async def login(request: LoginRequest):
    # Convert date_of_birth to the expected format
    dob_parts = request.date_of_birth.split('-')
    formatted_dob = f"{dob_parts[2]}/{dob_parts[1]}/{dob_parts[0]}"
    user=get_user_collection().find_one({"usn":request.username,"dob":formatted_dob})
    # Dummy authentication logic
    if user:
        return {"success": True}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")