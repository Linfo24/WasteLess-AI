import React, { useState } from "react";
import { makePlan, generateImage } from "../api";

export default function Dashboard() {
  const [items, setItems] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [images, setImages] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const onPlan = async () => {
    setLoading(true);
    setImages({});
    
    // Étape 1 : générer le plan
    const data = await makePlan(
      items.split(",").map((x) => x.trim()).filter(Boolean)
    );
    setPlan(data);

    // Étape 2 : générer les images
    for (const day of data.plan) {
      for (const meal of day.meals) {
        const title = meal.title;

        const img = await generateImage(title);

        setImages((prev: any) => ({
          ...prev,
          [title]: img.data_url,
        }));
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>3-Day Waste-Reduction Plan</h2>


      <textarea
        rows={3}
        value={items}
        onChange={(e) => setItems(e.target.value)}
        style={{ width: "100%" }}
      />

      <br />
      <button onClick={onPlan} disabled={loading}>
        {loading ? "Génération…" : "Générer le plan"}
      </button>

      {/* Résultats */}
      {plan && (
        <div style={{ marginTop: 40 }}>
          {plan.plan.map((day: any) => (
            <div key={day.day} style={{ marginBottom: 40 }}>
              <h3>Jour {day.day}</h3>

              {day.meals.map((meal: any) => (
                <div key={meal.title} style={{ marginBottom: 20 }}>
                  <h4>{meal.title}</h4>

                  {/* Affichage Image */}
                  {images[meal.title] ? (
                    <img
                      src={images[meal.title]}
                      alt={meal.title}
                      style={{ width: "100%", maxWidth: "400px", borderRadius: 10 }}
                    />
                  ) : (
                    <em>Generating image…</em>

                  )}

                  <p><strong>Ingredients :</strong> {meal.ingredients.join(", ")}</p>
                  <p>{meal.instructions}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
