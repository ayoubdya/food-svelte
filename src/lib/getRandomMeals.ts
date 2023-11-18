import type { Meal } from "./interfaces";
import { parse } from "./parseAPI";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

export async function getRandomMeals() {
  const randomMeals: Meal[] = [];
  for (let i = 0; i < 10; ++i) {
    const response = await fetch(url);
    const json = await response.json();
    const randomMeal = json.meals;
    randomMeals.push(parse(randomMeal, "name")[0]);
  }
  return randomMeals;
}
