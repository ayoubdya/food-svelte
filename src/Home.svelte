<script lang="ts">
  import FoodCard from "./components/FoodCard.svelte";
  import Header from "./components/Header.svelte";
  import { getRandomMeals } from "./lib/getRandomMeals";
  import { getMealByType } from "./lib/getMealByType";
  import type { searchType } from "./lib/interfaces";
  import { getMealByName } from "./lib/getMealByName";
  import TypeCard from "./components/TypeCard.svelte";
  import Footer from "./components/Footer.svelte";

  let search: string;
  let searchType: searchType;
</script>

<main class="">
  <Header bind:search bind:searchType />
  <div class="flex flex-col items-center min-h-screen">
    <div
      class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-2 p-2"
    >
      {#if search}
        {#if searchType === "name"}
          {#await getMealByName(search) then meals}
            {#each meals as meal}
              <FoodCard {meal} />
            {/each}
          {/await}
        {:else}
          {#await getMealByType(search, searchType) then meals}
            {#each meals as meal}
              <TypeCard {meal} />
            {/each}
          {/await}
        {/if}
      {:else}
        {#await getRandomMeals() then randomMeals}
          {#each randomMeals as meal}
            <FoodCard {meal} />
          {/each}
        {/await}
      {/if}
    </div>
  </div>
  <Footer />
</main>
