import pytest
from httpx import AsyncClient

BASE_URL = "http://127.0.0.1:8000"

@pytest.mark.asyncio
async def test_get_pathfinder_questions():
    async with AsyncClient(base_url=BASE_URL) as client:
        response = await client.get("/pathfinder/question/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

@pytest.mark.asyncio
async def test_validate_pathfinder_answer():
    payload = {
        "id": 12,
        "matrix": [
            [0, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [1, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0]
        ]}
    async with AsyncClient(base_url=BASE_URL) as client:
        response = await client.post("/pathfinder/validate/", json=payload)
        assert response.status_code == 200
        assert "result" in response.json()

@pytest.mark.asyncio
async def test_get_relation_questions():
    async with AsyncClient(base_url=BASE_URL) as client:
        response = await client.get("/relation/question/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

@pytest.mark.asyncio
async def test_validate_relation_answer():
    payload = {
        "question_id": 16,
        "reflexive": False,
        "symmetric": False,
        "transitive": True}
    async with AsyncClient(base_url=BASE_URL) as client:
        response = await client.post("/relation/validate/validate_relation/", json=payload)
        assert response.status_code in [200, 307]