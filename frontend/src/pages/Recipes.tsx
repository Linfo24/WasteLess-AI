import React, { useState } from "react";
import { makeRecipes, generateImage } from "../api";
import "./ui.css";

export default function Recipes() {
  const [items, setItems] = useState("tomatoes, chicken, rice, yogurt, spinach");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [images, setImages] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setRecipes([]);
    setImages({});

    const data = await makeRecipes(
      items.split(",").map((i) => i.trim()).filter(Boolean)
    );

    setRecipes(data);

    // Génération d’image pour chaque recette
    for (const recipe of data) {
      try {
        const img = await generateImage(recipe.title);

        setImages((prev: any) => ({
          ...prev,
          [recipe.title]: img.data_url || img.url,
        }));
      } catch {
        setImages((prev: any) => ({ ...prev, [recipe.title]: null }));
      }
    }

    setLoading(false);
  }

  return (
    <div className="page-container">
      <h1 className="title">AI Recipe Generator</h1>

      <div className="card">
        <label>Available items</label>
        <textarea
          rows={3}
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="Enter items (comma-separated)"
        />

        <button onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "Generate 3 Recipes"}
        </button>
      </div>

      <div className="plan-grid">
        {recipes.map((recipe: any) => (
          <div key={recipe.title} className="meal-card">
            <h2>{recipe.title}</h2>

            {/* IMAGE */}
            <div className="meal-img-box">
              {images[recipe.title] ? (
                <img src={images[recipe.title]} alt={recipe.title} />
              ) : (
                <div className="img-loading">Loading image…</div>
              )}
            </div>

            <strong>Ingredients Needed:</strong>
            <ul>
              {recipe.needed.map((n: string) => (
                <li key={n}>{n}</li>
              ))}
            </ul>

            <strong>Steps:</strong>
            <ol>
              {recipe.steps.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
