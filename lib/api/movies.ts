/**
 * Movie API Service
 * Handles all movie-related API calls
 */

import { apiRequest } from "./client"

export interface Movie {
  movie_id: number
  title: string
  genres: string
  director: string
  cast?: string
  rating: number
  year: number
  description: string
  similarity_score?: number
  predicted_rating?: number
}

export interface MoviesResponse {
  count: number
  movies: Movie[]
  filters?: {
    genre?: string
    min_rating?: number
  }
}

export interface MovieFilters {
  limit?: number
  genre?: string
  min_rating?: number
}

/**
 * Fetch a list of movies with optional filters
 */
export async function getMovies(filters?: MovieFilters): Promise<MoviesResponse> {
  const params = new URLSearchParams()

  if (filters?.limit) params.append("limit", filters.limit.toString())
  if (filters?.genre) params.append("genre", filters.genre)
  if (filters?.min_rating) params.append("min_rating", filters.min_rating.toString())

  const queryString = params.toString()
  const endpoint = `/movies${queryString ? `?${queryString}` : ""}`

  return apiRequest<MoviesResponse>(endpoint)
}

/**
 * Fetch a single movie by ID
 */
export async function getMovieById(movieId: number): Promise<Movie> {
  return apiRequest<Movie>(`/movies/${movieId}`)
}
