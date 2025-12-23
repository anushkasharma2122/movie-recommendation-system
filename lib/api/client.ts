/**
 * API Client Configuration
 * Handles API base URL and common request configurations
 */

// Backend API URL - defaults to localhost in development
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

/**
 * Generic API request handler with error handling
 */
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.detail || `API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[v0] API request failed for ${endpoint}:`, error.message)
      throw error
    }
    throw new Error("Unknown API error occurred")
  }
}
