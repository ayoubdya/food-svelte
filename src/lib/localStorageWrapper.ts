import { getMealById } from "./getMealById";
import type { Meal } from "./interfaces";

export class LocalStorage {
  private static uniqueInstance: LocalStorage;

  private favouriteMeals: Meal[] = [];

  constructor() {
    const localMeals = localStorage.getItem("favouriteMeals");
    if (localMeals) this.favouriteMeals = JSON.parse(localMeals);
  }

  static getUniqueInstance(): LocalStorage {
    if (!LocalStorage.uniqueInstance) {
      LocalStorage.uniqueInstance = new LocalStorage();
    }
    return LocalStorage.uniqueInstance;
  }

  getFavouriteMeals(): Meal[] {
    return this.favouriteMeals;
  }

  async addFavouriteMeal(id: string): Promise<void> {
    const meal = await getMealById(id);
    this.favouriteMeals.push(meal);
    localStorage.setItem("favouriteMeals", JSON.stringify(this.favouriteMeals));
  }

  removeFavouriteMeal(id: string): void {
    this.favouriteMeals = this.favouriteMeals.filter((m) => m.id !== id);
    localStorage.setItem("favouriteMeals", JSON.stringify(this.favouriteMeals));
  }

  isFavouriteMeal(id: string): boolean {
    return this.favouriteMeals.some((m) => m.id === id);
  }

  clearFavouriteMeals(): void {
    this.favouriteMeals = [];
    localStorage.setItem("favouriteMeals", JSON.stringify(this.favouriteMeals));
  }

  getFavouriteMealsCount(): number {
    return this.favouriteMeals.length;
  }

  getFavouriteMealsIds(): string[] {
    return this.favouriteMeals.map((m) => m.id);
  }
}
