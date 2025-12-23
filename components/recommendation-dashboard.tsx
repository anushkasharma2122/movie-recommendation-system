"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieCard } from "@/components/movie-card"
import { SearchFilters } from "@/components/search-filters"
import { Film, Users } from "lucide-react"
import { getContentBasedRecommendations, getCollaborativeRecommendations } from "@/lib/api/recommendations"
import { isBackendAvailable } from "@/lib/api/health"
import { getMockContentBasedRecommendations, getMockCollaborativeRecommendations } from "@/lib/mock-data"
import type { Movie } from "@/lib/api/movies"

export function RecommendationDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [contentBasedMovies, setContentBasedMovies] = useState<Movie[]>([])
  const [collaborativeMovies, setCollaborativeMovies] = useState<Movie[]>([])
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    setIsLoading(true)
    console.log("[v0] Loading recommendations...")

    try {
      // Check if backend is available
      const backendAvailable = await isBackendAvailable()
      console.log("[v0] Backend available:", backendAvailable)

      if (backendAvailable) {
        // Load from real API
        const [contentResponse, collaborativeResponse] = await Promise.all([
          getContentBasedRecommendations(3, 6), // Based on Inception (movie_id: 3)
          getCollaborativeRecommendations(1, 6), // For user_id: 1
        ])

        setContentBasedMovies(contentResponse.recommendations)
        setCollaborativeMovies(collaborativeResponse.recommendations)
        setUsingMockData(false)
        console.log("[v0] Loaded recommendations from API")
      } else {
        throw new Error("Backend unavailable")
      }
    } catch (error) {
      // Fallback to mock data
      console.log("[v0] Using mock data:", error)
      setContentBasedMovies(getMockContentBasedRecommendations(3))
      setCollaborativeMovies(getMockCollaborativeRecommendations(1))
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Personalized Recommendations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Powered by advanced machine learning algorithms analyzing content features and user preferences
          </p>
          {usingMockData && <p className="mt-2 text-sm text-amber-400">Currently using mock data (Backend offline)</p>}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Recommendation Tabs */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="content" className="gap-2">
              <Film className="h-4 w-4" />
              Content-Based
            </TabsTrigger>
            <TabsTrigger value="collaborative" className="gap-2">
              <Users className="h-4 w-4" />
              Collaborative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-8">
            <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Content-Based Filtering:</span> Recommendations based on
                movie features like genres, directors, and plot keywords using cosine similarity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contentBasedMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={{
                    id: movie.movie_id,
                    title: movie.title,
                    genre: movie.genres.split("|"),
                    rating: movie.rating,
                    year: movie.year,
                    poster: `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(movie.title + " movie poster")}`,
                  }}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaborative" className="mt-8">
            <div className="mb-6 rounded-lg border border-secondary/20 bg-secondary/5 p-4 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-secondary">Collaborative Filtering:</span> Recommendations based on
                similar users' preferences using user-item interaction matrices.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collaborativeMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={{
                    id: movie.movie_id,
                    title: movie.title,
                    genre: movie.genres.split("|"),
                    rating: movie.rating,
                    year: movie.year,
                    poster: `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(movie.title + " movie poster")}`,
                  }}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
