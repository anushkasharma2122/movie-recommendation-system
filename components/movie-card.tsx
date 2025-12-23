"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Movie {
  id: number
  title: string
  genre: string[]
  rating: number
  year: number
  poster: string
}

interface MovieCardProps {
  movie: Movie
  isLoading?: boolean
}

export function MovieCard({ movie, isLoading }: MovieCardProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <Skeleton className="aspect-[2/3] w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Rating Badge - Positioned absolutely on poster */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-white">{movie.rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        {/* Genre Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {movie.genre.map((g) => (
            <Badge
              key={g}
              variant="secondary"
              className="bg-secondary/20 text-xs text-secondary-foreground hover:bg-secondary/30"
            >
              {g}
            </Badge>
          ))}
        </div>

        {/* Year */}
        <p className="text-sm text-muted-foreground">{movie.year}</p>
      </div>
    </Card>
  )
}
