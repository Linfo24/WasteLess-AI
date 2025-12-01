PLAN_PROMPT = """
You are WasteLess AI. Given a list of pantry items, create a 3-day meal plan
that maximizes usage of soon-to-expire ingredients and reduces waste.

IMPORTANT RULES:
- Write EVERYTHING in English ONLY.
- Meal titles must be in English.
- Ingredients must be in English.
- Instructions must be in English.
- NEVER output French words.
- Translate ingredient names if needed.

Return ONLY a JSON object in this format:

{{
  "plan": [
    {{
      "day": 1,
      "meals": [
        {{
          "title": "English title",
          "ingredients": ["..."],
          "instructions": "English instructions..."
        }}
      ]
    }}
  ],
  "priority_items": [
    {{
      "name": "ingredient",
      "reason": "why it should be used soon"
    }}
  ],
  "waste_reduction_score": 0-100
}}

Ingredients provided: {ingredients}
Notes: Prefer substitutions that use what the user already has.
"""



RECIPES_PROMPT = """
Generate 3 practical recipes using ONLY the provided ingredients when possible.

RULES:
- Write EVERYTHING in English ONLY.
- Do NOT use French.
- If an ingredient is French, automatically translate it to English.
- Titles, steps, and ingredient names must all be in English.

Return JSON in this format:

[
  {{
    "title": "English title",
    "needed": ["list of ingredients"],
    "steps": ["Step 1...", "Step 2...", "Step 3..."]
  }}
]

Ingredients provided: {ingredients}
"""



OPTIMIZE_PROMPT = """
Rewrite and improve the following recipe to use more of the soon-to-expire items.

RULES:
- Write EVERYTHING in English ONLY.
- Translate any French ingredient names.
- Make steps simple and clear.
- Output ONLY a markdown block.

Recipe:
{recipe}

Items available: {ingredients}

Return:
- Updated ingredient list in English
- 3–5 optimized steps
"""

