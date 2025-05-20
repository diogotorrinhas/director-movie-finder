<script>
  import { onMount } from 'svelte';
  import { loadAllDirectors } from '../stores/directors';
  import SearchBox from '../components/SearchBox.svelte';
  import MovieList from '../components/MovieList.svelte';

  let filter = '';
  const setFilter = (val) => filter = val;

  onMount(() => {
    loadAllDirectors();
  });
</script>

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">Search for a Director</h1>
  <SearchBox {filter} {setFilter} />
  <MovieList />
</main>
