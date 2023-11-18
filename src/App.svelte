<script lang="ts">
  import Router from "svelte-spa-router";

  import Home from "./Home.svelte";
  import Meal from "./components/Meal.svelte";
  import Favourite from "./components/Favourite.svelte";

  const routes = {
    "/": Home,
    "/meal/:id": Meal,
    "/favourite": Favourite,
  };
</script>

<Router {routes} />
