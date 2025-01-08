# Graph Games Backend

This is the backend for educational games Path Finder and Warshall's Algorithm using FastAPI and SQLite.

## Features
- Graph examples (e.g., cyclic, tree, disconnected)
- Validate user paths in Path Finder
- Compute transitive closure in Warshall's Algorithm

## Setup
1. Install dependencies: `pip install -r requirements.txt` or Run this in terminal `source ./.venv/bin/activate`
2. Run the app: `uvicorn main:app --reload`
3. Access the API documentation: `http://127.0.0.1:8000/docs` or type this in your browser `localhost:8000/docs`
