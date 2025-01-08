from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///game.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

def seed_database():
    from models.graph_models import Graph
    from services.graph_service import to_json, generate_cyclic_graph, generate_tree_graph

    example_graphs = [
        {"name": "Simple Graph", "adjacency_matrix": to_json([[0, 1, 0], [0, 0, 1], [1, 0, 0]])},
        {"name": "Disconnected Graph", "adjacency_matrix": to_json([[0, 0, 0], [0, 0, 0], [0, 0, 0]])},
        {"name": "Fully Connected Graph", "adjacency_matrix": to_json([[0, 1, 1], [1, 0, 1], [1, 1, 0]])},
        {"name": "Cyclic Graph (5 Nodes)", "adjacency_matrix": generate_cyclic_graph(5)},
        {"name": "Tree Graph (7 Nodes)", "adjacency_matrix": generate_tree_graph(7)},
    ]

    with Session(engine) as session:
        for graph in example_graphs:
            if not session.query(Graph).filter(Graph.name == graph["name"]).first():
                session.add(Graph(name=graph["name"], adjacency_matrix=graph["adjacency_matrix"]))
        session.commit()
