import json
from typing import List

def to_json(matrix: List[List[int]]) -> str:
    return json.dumps(matrix)

def parse_matrix(matrix: str) -> List[List[int]]:
    return json.loads(matrix)

def generate_cyclic_graph(size: int) -> str:
    matrix = [[0] * size for _ in range(size)]
    for i in range(size):
        matrix[i][(i + 1) % size] = 1
    return to_json(matrix)

def generate_tree_graph(size: int) -> str:
    matrix = [[0] * size for _ in range(size)]
    for i in range(1, size):
        matrix[i][(i - 1) // 2] = 1
    return to_json(matrix)
