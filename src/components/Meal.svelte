<script lang="ts">
  import { getMealById } from "../lib/getMealById";
  import { LocalStorage } from "../lib/localStorageWrapper";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";

  import { twMerge } from "tailwind-merge";

  export let params: { id: string };

  const favourites = LocalStorage.getUniqueInstance();
  let isFavourite = favourites.isFavouriteMeal(params.id);
</script>

<Header disabled search="" />

{#await getMealById(params.id) then meal}
  <div class="flex p-2 min-h-screen justify-center">
    <div class="w-full max-w-7xl flex flex-col lg:flex-row gap-3">
      <img
        src={meal.thumbnail}
        alt="meal"
        class="w-full aspect-video lg:w-1/2 lg:aspect-square object-cover rounded-3xl drop-shadow-xl"
      />
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold">{meal.name}</h1>
          <button
            on:click={async () => {
              if (!isFavourite) {
                await favourites.addFavouriteMeal(meal.id);
                isFavourite = true;
              } else {
                favourites.removeFavouriteMeal(meal.id);
                isFavourite = false;
              }
            }}
          >
            <svg
              viewBox="0 0 24 24"
              class={twMerge(
                "w-6 h-6 hover:fill-yellow-500 hover:scale-110 active:scale-95 transition-all drop-shadow-md",
                `${isFavourite ? "fill-yellow-500" : ""}`
              )}
            >
              <path
                d="M17.562 21.56a1 1 0 01-.465-.116L12 18.764l-5.097 2.68a1 1 0 01-1.45-1.053l.973-5.676-4.124-4.02a1 1 0 01.554-1.705l5.699-.828 2.549-5.164a1.04 1.04 0 011.793 0l2.548 5.164 5.699.828a1 1 0 01.554 1.705l-4.124 4.02.974 5.676a1 1 0 01-.985 1.169z"
              />
            </svg>
          </button>
        </div>
        <p><span class="text-sm font-light">Category:</span> {meal.category}</p>
        <p><span class="text-sm font-light">Area:</span> {meal.area}</p>
        <p>
          <span class="text-sm font-light">Instructions:</span>
          {meal.instructions}
        </p>
        <p class="text-sm font-light">Ingredients:</p>
        <ol class="list-decimal list-inside">
          {#each meal.ingredients as ingredient}
            <li>
              <span class="font-bold">{ingredient.measure}</span>
              {ingredient.name}
            </li>
          {/each}
        </ol>
        <div class="flex gap-2 items-center">
          <span class="text-sm font-light">Tags:</span>
          {#each meal.tags as tag}
            <span class="text-sm font-light bg-gray-200 rounded-full px-2 py-1">
              {tag}
            </span>
          {/each}
        </div>
        <iframe
          src={`https://www.youtube.com/embed/${meal.youtube}`}
          frameborder="0"
          title="YouTube video player"
          class="w-full aspect-video rounded-lg drop-shadow-lg"
        />
      </div>
    </div>
  </div>
{/await}
<Footer />
