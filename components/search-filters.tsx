"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchFilters() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm lg:flex-row lg:items-center">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search for movies..." className="pl-10 bg-background/50 border-border/50" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row lg:gap-3">
        <Select defaultValue="all-genres">
          <SelectTrigger className="w-full sm:w-[160px] bg-background/50 border-border/50">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-genres">All Genres</SelectItem>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="sci-fi">Sci-Fi</SelectItem>
            <SelectItem value="thriller">Thriller</SelectItem>
            <SelectItem value="drama">Drama</SelectItem>
            <SelectItem value="crime">Crime</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-ratings">
          <SelectTrigger className="w-full sm:w-[160px] bg-background/50 border-border/50">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-ratings">All Ratings</SelectItem>
            <SelectItem value="9+">9.0+</SelectItem>
            <SelectItem value="8+">8.0+</SelectItem>
            <SelectItem value="7+">7.0+</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-years">
          <SelectTrigger className="w-full sm:w-[160px] bg-background/50 border-border/50">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-years">All Years</SelectItem>
            <SelectItem value="2020s">2020s</SelectItem>
            <SelectItem value="2010s">2010s</SelectItem>
            <SelectItem value="2000s">2000s</SelectItem>
            <SelectItem value="1990s">1990s</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Apply
        </Button>
      </div>
    </div>
  )
}
