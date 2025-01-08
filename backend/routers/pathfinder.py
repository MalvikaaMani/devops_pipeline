from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from services.pathfinder_service import validate_path
from models.graph_models import Graph
from services.graph_service import parse_matrix

router = APIRouter()

@router.get("/examples")
def get_example_graphs(session: Session = Depends(get_session)):
    graphs = session.query(Graph).all()
    return {"examples": [{"id": graph.id, "name": graph.name, "adjacency_matrix": graph.adjacency_matrix} for graph in graphs]}

@router.post("/validate")
def validate_user_path(graph_id: int, path: list[int], session: Session = Depends(get_session)):
    graph = session.get(Graph, graph_id)
    if not graph:
        return {"error": "Graph not found"}
    matrix = parse_matrix(graph.adjacency_matrix)
    is_valid = validate_path(matrix, path)
    return {"path_valid": is_valid}
