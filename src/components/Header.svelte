<script lang="ts">
  import { link, location } from "svelte-spa-router";
  import type { searchType } from "../lib/interfaces";
  import { twMerge } from "tailwind-merge";

  const SEARCH_DELAY = 500;

  let rtSearch: String;
  export let search: String;

  export let searchType: searchType = "name";

  $: if (search !== rtSearch) {
    setTimeout(() => {
      search = rtSearch;
    }, SEARCH_DELAY);
  }

  export let disabled: boolean = false;
</script>

<div class="flex border-b-[1px] mb-2 justify-center">
  <nav
    id="header"
    class="flex gap-4 justify-center items-center max-w-7xl w-full h-20 p-3"
  >
    <div class="sm:flex gap-2 items-center hidden">
      <svg viewBox="0 0 24 24" class="w-8 h-8 fill-black">
        <path
          d="M22 18a4 4 0 01-4 4h-3a4 4 0 01-4-4v-2h6.79l2.76-4.77 1.56.9L19.87 16H22v2M9 22H2c0-3 0-6 .33-9.17C2.6 10.3 3.08 7.66 3.6 5H3V3h5v2h-.6c.52 2.66 1 5.3 1.27 7.83C9 16 9 19 9 22z"
        />
      </svg>
      <div class="flex flex-col font-bold text-sm">
        <span>Ayoub</span>
        <span>Meals</span>
      </div>
    </div>
    <div class="flex flex-1 gap-4 items-center justify-center">
      <a
        href="/"
        use:link
        class={$location === "/"
          ? "text-md font-bold"
          : "text-sm font-light text-gray-800"}>Home</a
      >
      <a
        href="/favourite"
        use:link
        class={$location === "/favourite"
          ? "text-md font-bold"
          : "text-sm font-light text-gray-800"}>Favourites</a
      >
      <div
        class={twMerge(
          "group flex items-center h-full w-full max-w-sm focus:bg-white rounded-2xl",
          `${disabled ? "bg-gray-300" : "bg-gray-100"}`
        )}
      >
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          class="w-8 h-8 aspect-square m-2 text-gray-500"
        >
          <path
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
          />
        </svg>
        <select
          bind:value={searchType}
          {disabled}
          class="h-full bg-inherit text-gray-500 text-sm rounded-lg outline-none border-none mr-2"
        >
          {#each ["name", "category", "area", "ingredient"] as searchType}
            <option value={searchType}
              >{searchType.charAt(0).toUpperCase() +
                searchType.slice(1)}</option
            >
          {/each}
        </select>
        <input
          {disabled}
          placeholder={!disabled ? `Search by ${searchType}` : ""}
          type="text"
          bind:value={rtSearch}
          class="outline-none h-full w-full bg-inherit rounded-2xl rounded-s-none group-focus:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-2"
        />
      </div>
    </div>
  </nav>
</div>
