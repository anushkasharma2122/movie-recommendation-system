import { Button } from "@/components/ui/button"
import { Sparkles, Github, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Floating badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Recommendations</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center">
          <h1 className="text-balance bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
            AI-Powered Movie
            <br />
            Recommendation System
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Content-Based & Collaborative Filtering using Machine Learning. Discover your next favorite movie with
            advanced AI algorithms.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-base font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Explore Recommendations
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-border/50 bg-card/50 text-base backdrop-blur-sm transition-all hover:bg-card"
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub
            </Button>
          </div>

          {/* Feature icons */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-3 backdrop-blur-sm">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">AI-Driven</div>
                <div className="text-sm text-muted-foreground">Machine Learning Models</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 p-3 backdrop-blur-sm">
                <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Data Analysis</div>
                <div className="text-sm text-muted-foreground">Pandas & NumPy</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 p-3 backdrop-blur-sm">
                <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Smart Filtering</div>
                <div className="text-sm text-muted-foreground">Cosine Similarity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
