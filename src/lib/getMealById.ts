import type { Meal } from "./interfaces";
import { parse } from "./parseAPI";

const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export async function getMealById(id: string): Promise<Meal> {
  const response = await fetch(url + id);
  const json = await response.json();
  const meal = parse(json.meals, "name")[0];
  return meal;
}
