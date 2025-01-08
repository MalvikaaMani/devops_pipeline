from services.pathfinder_service import validate_path

def test_validate_path():
    matrix = [[0, 1, 0], [0, 0, 1], [1, 0, 0]]
    
    path = [0, 1, 2]
    assert validate_path(matrix, path) == True

    invalid_path = [0, 2]
    assert validate_path(matrix, invalid_path) == False
