import type { LessMeal, MappedTypes, Meal, searchType } from "./interfaces";

export function parse<T extends searchType>(
  meals_: any,
  type: T
): MappedTypes<T>[] {
  if (type === "name") {
    const meals: Meal[] = [];
    if (!meals_) return meals as MappedTypes<T>[];
    for (let meal_ of meals_) {
      const meal: Meal = {
        id: meal_.idMeal,
        thumbnail: meal_.strMealThumb,
        name: meal_.strMeal,
        category: meal_.strCategory,
        area: meal_.strArea,
        instructions: meal_.strInstructions,
        tags: meal_.strTags?.split(",") || [],
        youtube: meal_.strYoutube.split("=")[1],
        ingredients: [],
      };
      for (let i = 1; i <= 20; ++i) {
        if (!meal_["strIngredient" + i]) break;
        meal.ingredients!.push({
          name: meal_["strIngredient" + i],
          measure: meal_["strMeasure" + i],
        });
      }
      meals.push(meal);
    }
    return meals as MappedTypes<T>[];
  } else {
    const meals: LessMeal[] = [];
    if (!meals_) return meals as MappedTypes<T>[];
    for (let meal_ of meals_) {
      const meal: LessMeal = {
        id: meal_.idMeal,
        thumbnail: meal_.strMealThumb,
        name: meal_.strMeal,
      };
      meals.push(meal);
    }
    return meals as MappedTypes<T>[];
  }
}
