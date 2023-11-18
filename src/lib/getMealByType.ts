import type { LessMeal, searchType } from "./interfaces";
import { parse } from "./parseAPI";

type LessSearchType = Exclude<searchType, "name">;

const mapType: Record<LessSearchType, string> = {
  category: "filter.php?c",
  area: "filter.php?a",
  ingredient: "filter.php?i",
};

export async function getMealByType(
  search: string,
  type: LessSearchType
): Promise<LessMeal[]> {
  const url = `https://www.themealdb.com/api/json/v1/1/${mapType[type]}=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  const meals_ = await data.meals;
  return parse(meals_, type);
}
