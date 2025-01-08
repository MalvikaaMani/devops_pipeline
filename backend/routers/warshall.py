from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models.graph_models import Graph
from services.graph_service import parse_matrix
from services.warshall_service import compute_transitive_closure

router = APIRouter()

@router.post("/transitive_closure")
def compute_closure(graph_id: int, session: Session = Depends(get_session)):
    graph = session.get(Graph, graph_id)
    if not graph:
        return {"error": "Graph not found"}
    matrix = parse_matrix(graph.adjacency_matrix)
    closure = compute_transitive_closure(matrix)
    return {"transitive_closure": closure}
