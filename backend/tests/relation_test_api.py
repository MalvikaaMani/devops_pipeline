### tests/relation_test_api.py
import requests

BASE_URL = "http://127.0.0.1:8000"

def test_get_relation_questions():
    response = requests.get(f"{BASE_URL}/relation/questions")
    assert response.status_code == 200

def test_validate_relation():
    response = requests.post(f"{BASE_URL}/relation/validate", json={
        "id": 1,
        "relation": [[1,2], [2,3]],
        "result": [1,0,1]
    })
    assert response.status_code == 200