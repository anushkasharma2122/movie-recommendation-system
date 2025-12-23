/**
 * Recommendations API Service
 * Handles content-based and collaborative filtering API calls
 */

import { apiRequest } from "./client"
import type { Movie } from "./movies"

export interface RecommendationsResponse {
  method: string
  movie_id?: number
  user_id?: number
  count: number
  recommendations: Movie[]
}

/**
 * Get content-based movie recommendations
 * Recommends movies similar to the given movie based on content features
 */
export async function getContentBasedRecommendations(movieId: number, limit = 10): Promise<RecommendationsResponse> {
  const endpoint = `/recommend/content-based?movie_id=${movieId}&limit=${limit}`
  return apiRequest<RecommendationsResponse>(endpoint)
}

/**
 * Get collaborative filtering recommendations
 * Recommends movies based on user preferences and similar users
 */
export async function getCollaborativeRecommendations(userId: number, limit = 10): Promise<RecommendationsResponse> {
  const endpoint = `/recommend/collaborative?user_id=${userId}&limit=${limit}`
  return apiRequest<RecommendationsResponse>(endpoint)
}
