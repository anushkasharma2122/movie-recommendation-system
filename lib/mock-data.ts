/**
 * Mock Data for Fallback
 * Used when backend API is unavailable
 */

import type { Movie } from "./api/movies"

export const mockMovies: Movie[] = [
  {
    movie_id: 1,
    title: "The Shawshank Redemption",
    genres: "Drama",
    director: "Frank Darabont",
    cast: "Tim Robbins|Morgan Freeman",
    rating: 9.3,
    year: 1994,
    description: "Two imprisoned men bond over a number of years",
  },
  {
    movie_id: 2,
    title: "The Dark Knight",
    genres: "Action|Crime|Drama",
    director: "Christopher Nolan",
    cast: "Christian Bale|Heath Ledger",
    rating: 9.0,
    year: 2008,
    description: "Batman must accept one of the greatest psychological tests",
  },
  {
    movie_id: 3,
    title: "Inception",
    genres: "Action|Sci-Fi|Thriller",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio|Joseph Gordon-Levitt",
    rating: 8.8,
    year: 2010,
    description: "A thief who steals corporate secrets through dream-sharing",
  },
  {
    movie_id: 4,
    title: "Pulp Fiction",
    genres: "Crime|Drama",
    director: "Quentin Tarantino",
    cast: "John Travolta|Uma Thurman",
    rating: 8.9,
    year: 1994,
    description: "The lives of two mob hitmen intersect with others",
  },
  {
    movie_id: 5,
    title: "The Matrix",
    genres: "Action|Sci-Fi",
    director: "Lana Wachowski",
    cast: "Keanu Reeves|Laurence Fishburne",
    rating: 8.7,
    year: 1999,
    description: "A computer hacker learns about the true nature of reality",
  },
  {
    movie_id: 8,
    title: "Interstellar",
    genres: "Adventure|Drama|Sci-Fi",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey|Anne Hathaway",
    rating: 8.6,
    year: 2014,
    description: "A team of explorers travel through a wormhole in space",
  },
  {
    movie_id: 10,
    title: "The Prestige",
    genres: "Drama|Mystery|Thriller",
    director: "Christopher Nolan",
    cast: "Christian Bale|Hugh Jackman",
    rating: 8.5,
    year: 2006,
    description: "Two stage magicians engage in competitive one-upmanship",
  },
  {
    movie_id: 18,
    title: "Blade Runner 2049",
    genres: "Drama|Mystery|Sci-Fi",
    director: "Denis Villeneuve",
    cast: "Ryan Gosling|Harrison Ford",
    rating: 8.0,
    year: 2017,
    description: "A blade runner discovers a secret that could plunge society",
  },
  {
    movie_id: 21,
    title: "Arrival",
    genres: "Drama|Sci-Fi",
    director: "Denis Villeneuve",
    cast: "Amy Adams|Jeremy Renner",
    rating: 7.9,
    year: 2016,
    description: "A linguist works to interpret alien communications",
  },
  {
    movie_id: 23,
    title: "Ex Machina",
    genres: "Drama|Sci-Fi|Thriller",
    director: "Alex Garland",
    cast: "Alicia Vikander|Domhnall Gleeson",
    rating: 7.7,
    year: 2014,
    description: "A programmer evaluates the human qualities of an AI",
  },
]

/**
 * Get mock recommendations for a movie
 */
export function getMockContentBasedRecommendations(movieId: number): Movie[] {
  // Return different movies based on the input to simulate similarity
  return mockMovies.filter((m) => m.movie_id !== movieId).slice(0, 6)
}

/**
 * Get mock collaborative recommendations for a user
 */
export function getMockCollaborativeRecommendations(userId: number): Movie[] {
  // Return a shuffled subset to simulate user preferences
  return [...mockMovies].sort(() => Math.random() - 0.5).slice(0, 6)
}
