import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select
from dotenv import load_dotenv
from sqlmodel import SQLModel
from typing import List, Optional
from openai import OpenAI
from fastapi import HTTPException
from pydantic import BaseModel
from datetime import datetime, date


from models import PantryItem, PlanRequest, RecipeRequest, OptimizeRequest
from database import init_db, get_session
from prompts import PLAN_PROMPT, RECIPES_PROMPT, OPTIMIZE_PROMPT

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI(title="WasteLess AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # pour la démo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/api/health")
def health():
    return {"ok": True}

@app.get("/api/pantry", response_model=List[PantryItem])
def list_pantry():
    with get_session() as s:
        return s.exec(select(PantryItem)).all()

@app.post("/api/pantry", response_model=PantryItem)
def add_item(item: PantryItem):
    with get_session() as s:

        # Convert expiry string → Python date
        if isinstance(item.expiry, str):
            try:
                item.expiry = datetime.strptime(item.expiry, "%Y-%m-%d").date()
            except:
                raise HTTPException(status_code=400, detail="Invalid date format. Must be YYYY-MM-DD.")

        s.add(item)
        s.commit()
        s.refresh(item)
        return item

def _generate_json(prompt: str) -> dict:
    # Appel modèle texte → JSON
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )
    import json
    return json.loads(resp.choices[0].message.content)

@app.post("/api/plan")
def make_plan(req: PlanRequest):
    ingredients = ", ".join(req.items)
    prompt = PLAN_PROMPT.format(ingredients=ingredients)
    return _generate_json(prompt)

@app.post("/api/recipes")
def make_recipes(req: RecipeRequest):
    ingredients = ", ".join(req.items)
    prompt = RECIPES_PROMPT.format(ingredients=ingredients)
    return _generate_json(prompt)

@app.post("/api/optimize")
def optimize_recipe(req: OptimizeRequest):
    ingredients = ", ".join(req.items)
    prompt = OPTIMIZE_PROMPT.format(recipe=req.recipe_text, ingredients=ingredients)
    # Ici on veut du markdown, pas du JSON
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return {"optimized": resp.choices[0].message.content}

class ImageRequest(BaseModel):
    title: str  # ex: "Poulet aux épinards et riz"


class ImageRequest(BaseModel):
    title: str

@app.post("/api/image")
def generate_image(req: ImageRequest):
    try:
        result = client.images.generate(
            model="gpt-image-1",
            prompt=req.title,
            size="1024x1024"
        )

        base64_data = result.data[0].b64_json
        return {"data_url": f"data:image/png;base64,{base64_data}"}

    except Exception as e:
        print("IMAGE ERROR:", str(e))
        # fallback en cas d’erreur OpenAI
        fallback = f"https://source.unsplash.com/1024x1024/?{req.title},food,recipe"
        return {
            "url": fallback,
            "fallback": True,
            "reason": str(e)
        }





@app.get("/")
def root():
    return {"status": "ok", "docs": "/docs"}
