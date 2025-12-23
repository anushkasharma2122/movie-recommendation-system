/**
 * Health Check API Service
 * Monitors backend API availability and model status
 */

import { apiRequest } from "./client"

export interface HealthResponse {
  status: string
  api_version: string
  models: {
    content_based: string
    collaborative: string
  }
}

/**
 * Check if the backend API is healthy and models are initialized
 */
export async function checkHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>("/health")
}

/**
 * Check if the backend is available
 * Returns true if backend is reachable, false otherwise
 */
export async function isBackendAvailable(): Promise<boolean> {
  try {
    const health = await checkHealth()
    return health.status === "healthy"
  } catch (error) {
    console.error("[v0] Backend health check failed:", error)
    return false
  }
}
