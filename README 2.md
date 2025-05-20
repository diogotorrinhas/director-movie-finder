# Sveltejs Junior Exercise
Welcome to this coding exercise! In this challenge, you'll build a small Svelte application that lets users search for a director and browse their movies using the TMDB API.

## Project Setup

Start by cloning the base project template:

```bash
git clone https://pmrvcastro@bitbucket.org/gruvi/junior-tmdb-svelte-exercise.git
cd junior-tmdb-svelte-exercise
npm install
npm run dev
```

The current Project allows you to search a director name and lists the films of the first match found. The project is very incomplete as you can quickly understand and some of its logic and decisions are flawed. To test how it is current working try to type "chris" and click on the "Search" button

Feel free to re-structure, rename, or redesign any part of the template to match your own preferences and best practices.

## TMDB API

This exercise uses The Movie Database (TMDB) API. Make sure to sign up for an API key at [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api).
The TMDB API KEY should be added on you `.env` file and should be called `VITE_TMDB_API_KEY`

Key endpoints you will need:

* **Search People:** `GET /search/person?api_key=<<api_key>>&query={name}`
* **Person Movie Credits:** `GET /person/{person_id}/movie_credits?api_key=<<api_key>>`
* **Movie Details:** `GET /movie/{movie_id}?api_key=<<api_key>>&append_to_response=genres,overview,release_date,poster_path`

> **Note:** Be mindful of TMDB rate limits when making requests.

## Requirements

1. **Search Autocomplete:**

   * Provide an input field to search for director names with live autocomplete suggestions as the user types.

2. **List Movies:**

   * After selecting a director, display a list of all movies they directed.

3. **Movie Details Page:**

   * When clicking on a movie from the list, navigate to a detail page showing:

     * Poster image
     * Genres
     * Release year
     * Synopsis (overview)

## Submission

* Create your own fork of the repository and send it to us by email. You can include any explanations or decisions and your README.md file.

Good luck, and have fun building!
