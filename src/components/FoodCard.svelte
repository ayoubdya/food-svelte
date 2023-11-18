<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { Meal } from "../lib/interfaces";
  import { LocalStorage } from "../lib/localStorageWrapper";
  import { twMerge } from "tailwind-merge";

  export let meal: Meal;

  const local = LocalStorage.getUniqueInstance();
  let isFavourite = local.isFavouriteMeal(meal.id);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={() => push(`/meal/${meal.id}`)}
  class="col-span-1 aspect-square relative rounded-lg overflow-hidden drop-shadow-lg text-white food-card cursor-pointer hover:brightness-90 active:scale-95 transition-all"
  style={`background-image: linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.7)), url(${meal.thumbnail});`}
>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h1 class="absolute bottom-1 inset-x-1 font-medium truncate cursor-pointer">
    {meal.name}
  </h1>
  <p class="absolute bottom-6 inset-x-1 font-light text-sm text-slate-200">
    {meal.category}
  </p>
  <button
    on:click={async (e) => {
      e.stopPropagation();
      if (!isFavourite) {
        await local.addFavouriteMeal(meal.id);
        isFavourite = true;
      } else {
        local.removeFavouriteMeal(meal.id);
        isFavourite = false;
        window.location.reload();
      }
    }}
  >
    <svg
      viewBox="0 0 24 24"
      class={twMerge(
        "w-6 h-6 absolute top-1 right-1 hover:fill-yellow-500 hover:scale-110 active:scale-95 transition-all drop-shadow-md",
        `${isFavourite ? "fill-yellow-500" : ""}`
      )}
      fill="currentColor"
    >
      <path
        d="M17.562 21.56a1 1 0 01-.465-.116L12 18.764l-5.097 2.68a1 1 0 01-1.45-1.053l.973-5.676-4.124-4.02a1 1 0 01.554-1.705l5.699-.828 2.549-5.164a1.04 1.04 0 011.793 0l2.548 5.164 5.699.828a1 1 0 01.554 1.705l-4.124 4.02.974 5.676a1 1 0 01-.985 1.169z"
      />
    </svg>
  </button>
</div>
