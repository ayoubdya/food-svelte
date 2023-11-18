<script>
  import { LocalStorage } from "../lib/localStorageWrapper";
  import FoodCard from "./FoodCard.svelte";
  import Footer from "./Footer.svelte";

  import Header from "./Header.svelte";

  const local = LocalStorage.getUniqueInstance();
  let favouriteMeals = local.getFavouriteMeals();
</script>

<Header disabled search="" />
<div class="flex flex-col items-center min-h-screen">
  <div
    class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-2 p-2"
  >
    {#each favouriteMeals as favouriteMeal}
      <FoodCard meal={favouriteMeal} />
    {/each}
  </div>
</div>
<Footer />
