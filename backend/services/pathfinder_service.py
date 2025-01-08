from typing import List

def validate_path(matrix: List[List[int]], path: List[int]) -> bool:
    for i in range(len(path) - 1):
        if matrix[path[i]][path[i + 1]] == 0:
            return False
    return True
