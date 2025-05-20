<script>
  import Router from 'svelte-spa-router';
  import Home from './pages/Home.svelte';
  import MovieDetails from './pages/MovieDetails.svelte';

  const routes = {
    '/': Home,
    '/movie/:movieId': MovieDetails,
  };
</script>

<Router {routes} />
