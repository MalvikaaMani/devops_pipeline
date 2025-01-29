from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import login, pathfinder_questions, pathfinder_validate, relation_questions, relation_validate
from database.pathfinder_database import load_questions as load_pathfinder_questions
from database.relation_database import relation_db

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure questions are loaded during startup
@app.on_event("startup")
def startup_event():
    print("Loading questions...")
    load_pathfinder_questions()
    relation_db.load_questions()

# Include routers
app.include_router(login.router)
app.include_router(pathfinder_questions.router, prefix="/pathfinder/question", tags=["Pathfinder Questions"])
app.include_router(pathfinder_validate.router, prefix="/pathfinder/validate", tags=["Pathfinder Validation"])
app.include_router(relation_questions.router, prefix="/relation/question", tags=["Relation Questions"])
app.include_router(relation_validate.router, prefix="/relation/validate", tags=["Relation Validation"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the KLM-GameCraft API"}
