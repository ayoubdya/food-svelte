export interface Ingredient {
  name: string;
  measure: string;
}

export interface Meal {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  area: string;
  instructions: string;
  tags: string[];
  youtube: string;
  ingredients: Ingredient[];
}

export interface LessMeal {
  id: string;
  name: string;
  thumbnail: string;
}

export type searchType = "name" | "category" | "area" | "ingredient";

export type MappedTypes<T extends searchType> = T extends "name"
  ? Meal
  : LessMeal;
