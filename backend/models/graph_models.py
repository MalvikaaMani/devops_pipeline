from sqlmodel import Field, SQLModel
from typing import Optional

class Graph(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    adjacency_matrix: str  # JSON string
    created_at: Optional[str] = Field(default=None)
