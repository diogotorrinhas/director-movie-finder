<script>
  import { selectedDirector, movies } from '../stores/directors';
</script>

{#if $selectedDirector}
  <h2 class="text-xl font-semibold mb-2">Movies by {$selectedDirector.name}</h2>
  <ul class="list-disc list-inside">
    {#each $movies as movie}
      <li class="mb-1">
        <a
          href={`#/movie/${movie.id}`}
          class="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          {movie.title} ({movie.release_date?.split('-')[0]})
        </a>
      </li>
    {/each}
  </ul>
{/if}
