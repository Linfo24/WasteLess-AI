const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export async function getPantry() {
  const r = await fetch(`${API_BASE}/api/pantry`);
  return r.json();
}

export async function addPantry(item: any) {
  const r = await fetch(`${API_BASE}/api/pantry`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(item)
  });
  return r.json();
}

export async function makePlan(items: string[]) {
  const r = await fetch(`${API_BASE}/api/plan`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ items })
  });
  return r.json();
}

export async function makeRecipes(items: string[]) {
  const r = await fetch(`${API_BASE}/api/recipes`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ items })
  });
  return r.json();
}

export async function optimizeRecipe(recipe_text: string, items: string[]) {
  const r = await fetch(`${API_BASE}/api/optimize`, {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ recipe_text, items })
  });
  return r.json();
}

export async function generateImage(title: string) {
  const r = await fetch(`${API_BASE}/api/image`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title })
  });
  return r.json(); // { data_url: 'data:image/png;base64,...' }
}
