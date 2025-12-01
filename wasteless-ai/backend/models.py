from typing import Optional
from datetime import date
from sqlmodel import SQLModel, Field

class PantryItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    quantity: float = 1.0
    unit: str = "unit"
    expiry: Optional[date] = None

class PlanRequest(SQLModel):
    items: list[str]

class RecipeRequest(SQLModel):
    items: list[str]

class OptimizeRequest(SQLModel):
    recipe_text: str
    items: list[str]
