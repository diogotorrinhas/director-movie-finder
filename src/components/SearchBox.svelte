<script>
  import { directors, selectedDirector, fetchMoviesForDirector } from '../stores/directors';
  import { get } from 'svelte/store';
  export let filter = '';
  export let setFilter;

  let suggestions = [];
  let showSuggestions = false;
  let activeIndex = -1;

  function updateSuggestions(value) {
    const allDirectors = get(directors);
    suggestions = allDirectors.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    showSuggestions = suggestions.length > 0;
    activeIndex = -1;
  }

  function handleInput(e) {
    const value = e.target.value;
    setFilter(value);
    updateSuggestions(value);
  }

  function handleKeyDown(e) {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      activeIndex = (activeIndex + 1) % suggestions.length;
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      activeIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
      e.preventDefault();
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      selectSuggestion(suggestions[activeIndex]);
      e.preventDefault();
    }
  }

  function selectSuggestion(director) {
    setFilter(director.name);
    showSuggestions = false;
    suggestions = [];
    selectedDirector.set(director);
    fetchMoviesForDirector(director.id);
  }

  async function handleSearch() {
    const allDirectors = get(directors);
    const match = allDirectors.find((d) =>
      d.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (match) {
      selectedDirector.set(match);
      await fetchMoviesForDirector(match.id);
    } else {
      alert('No directors found matching "' + filter + '"');
    }
  }

  function handleBlur() {
    setTimeout(() => {
      showSuggestions = false;
    }, 150);
  }
</script>

<div class="relative mb-4" style="max-width: 400px;">
  <div class="flex">
    <!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
    <input
      type="text"
      bind:value={filter}
      on:input={handleInput}
      on:keydown={handleKeyDown}
      on:blur={handleBlur}
      placeholder="Type director name"
      class="border rounded-l p-2 flex-grow"
      autocomplete="off"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      aria-expanded={showSuggestions}
    />
    <button
      on:click={handleSearch}
      class="bg-blue-600 text-white rounded-r px-4 hover:bg-blue-700 transition-colors"
      aria-label="Search directors"
      type="button"
    >
      Search
    </button>
  </div>

  {#if showSuggestions}
    <ul
      class="absolute z-20 bg-white border border-t-0 rounded-b shadow max-h-48 overflow-y-auto w-full"
      role="listbox"
    >
      {#each suggestions as suggestion, i}
        <li
          class="p-2 cursor-pointer hover:bg-blue-100 {i === activeIndex ? 'bg-blue-200' : ''}"
          on:mousedown={() => selectSuggestion(suggestion)} 
          role="option"
          aria-selected={i === activeIndex}
        >
          {suggestion.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>
