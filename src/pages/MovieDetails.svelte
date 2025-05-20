<script>
  import { fetchMovieDetails } from '../stores/directors';
  import { params } from 'svelte-spa-router';
  import { writable } from 'svelte/store';

  const movie = writable(null);

  // Reactively respond when $params.movieId changes
  $: if ($params?.movieId) {
    fetchMovieDetails($params.movieId).then(data => {
      movie.set(data);
    });
  }
</script>

{#if $movie}
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-2">{$movie.title}</h1>
    <img
      src={`https://image.tmdb.org/t/p/w500${$movie.poster_path}`}
      alt="{$movie.title} Poster"
      class="mb-4 max-w-xs"
    />
    <p><strong>Release Year:</strong> {$movie.release_date?.split('-')[0]}</p>
    <p><strong>Genres:</strong> {$movie.genres.map(g => g.name).join(', ')}</p>
    <p class="mt-2"><strong>Overview:</strong> {$movie.overview}</p>
  </div>

  <main class="player-content">
    <!-- svelte-ignore a11y_missing_attribute -->
    <iframe
      src={`https://vidsrc.su/embed/movie/${$params.movieId}`}
      id="videoFrame"
      allowfullscreen
      class="w-full h-[500px]"
    ></iframe>
  </main>
  
{:else}
  <p>Waiting for movies to load...</p>
{/if}
