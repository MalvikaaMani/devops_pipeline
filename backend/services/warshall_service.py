from typing import List

def compute_transitive_closure(matrix: List[List[int]]) -> List[List[int]]:
    n = len(matrix)
    closure = [row[:] for row in matrix]
    for k in range(n):
        for i in range(n):
            for j in range(n):
                closure[i][j] = closure[i][j] or (closure[i][k] and closure[k][j])
    return closure

