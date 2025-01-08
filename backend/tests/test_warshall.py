from services.warshall_service import compute_transitive_closure

def test_compute_transitive_closure():
    matrix = [[0, 1, 0], [0, 0, 1], [1, 0, 0]]
    expected = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    assert compute_transitive_closure(matrix) == expected
