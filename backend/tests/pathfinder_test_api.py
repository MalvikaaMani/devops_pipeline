### tests/pathfinder_test_api.py
import requests

BASE_URL = "http://127.0.0.1:8000"

def test_get_pathfinder_questions():
    response = requests.get(f"{BASE_URL}/pathfinder/questions")
    assert response.status_code == 200

def test_validate_pathfinder():
    response = requests.post(f"{BASE_URL}/pathfinder/validate", json={
        "id": 1,
        "question": "Example",
        "options": ["A", "B", "C", "D"],
        "correct_option": 2
    })
    assert response.status_code == 200