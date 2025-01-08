from fastapi import FastAPI
from database import create_db_and_tables, seed_database
from routers import pathfinder, warshall

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    seed_database()

app.include_router(pathfinder.router, prefix="/pathfinder", tags=["Path Finder"])
app.include_router(warshall.router, prefix="/warshall", tags=["Warshall's Algorithm"])
