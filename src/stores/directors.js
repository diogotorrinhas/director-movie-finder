import { writable } from 'svelte/store';

export const directors = writable([]);
export const selectedDirector = writable(null);
export const movies = writable([]);
//export const selectedMovie = writable(null); // ✅ New store

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log(API_KEY);

export async function loadAllDirectors() {
  let all = [];
  const first_page = 1;
  const max_number_of_pages = 20;
  let page = first_page;
  let total_pages = page;

  try {
    while (page <= total_pages && page < (first_page + max_number_of_pages)) {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await res.json();
      total_pages = data.total_pages;

      const filtered = data.results
        .filter((p) => p.known_for_department === 'Directing')
        .map((p) => ({ id: p.id, name: p.name }));

      all = all.concat(filtered);
      page++;
    }
    directors.set(all);
  } catch (e) {
    console.error('Failed to load directors:', e);
  }
}

export async function fetchMoviesForDirector(person_id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();

    const directed = data.crew
      .filter((c) => c.job === 'Director')
      .map((c) => ({
        id: c.id,
        title: c.title,
        release_date: c.release_date,
      }));

    movies.set(directed);
  } catch (e) {
    console.error('Failed to fetch movies:', e);
  }
}

// ✅ NEW FUNCTIONexport async function fetchMovieDetails(movie_id) {
export async function fetchMovieDetails(movie_id) {

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();

    // Extract only the needed fields
    const movieDetails = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      genres: data.genres,
      poster_path: data.poster_path
    };
    return movieDetails;
  } catch (e) {
    console.error(`Failed to fetch details for movie ID ${movie_id}:`, e);
    return null;
  }
  }

