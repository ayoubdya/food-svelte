import type { Meal } from "./interfaces";
import { parse } from "./parseAPI";

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

export async function getMealByName(name: string): Promise<Meal[]> {
  const response = await fetch(url + name);
  const data = await response.json();
  const meals_ = await data.meals;
  return parse(meals_, "name");
}
