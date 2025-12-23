import { Database, GitBranch, Target, Network } from "lucide-react"
import { Card } from "@/components/ui/card"

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Gathering and preprocessing movie datasets using Pandas and NumPy for efficient analysis",
    tech: ["Pandas", "NumPy", "CSV Processing"],
  },
  {
    icon: GitBranch,
    title: "Feature Engineering",
    description: "Extracting meaningful features like genres, cast, directors, and keywords from raw data",
    tech: ["TF-IDF", "Vectorization", "Normalization"],
  },
  {
    icon: Target,
    title: "Content-Based Filtering",
    description: "Computing similarity scores between movies using cosine similarity on feature vectors",
    tech: ["Cosine Similarity", "Scikit-Learn", "Feature Matching"],
  },
  {
    icon: Network,
    title: "Collaborative Filtering",
    description: "Building user-item matrices to find patterns in user preferences and generate recommendations",
    tech: ["Matrix Factorization", "User Clustering", "Pattern Recognition"],
  },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Our recommendation engine leverages advanced machine learning techniques to deliver personalized movie
            suggestions
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Step number */}
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-primary/5">{index + 1}</div>

                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-3">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">{step.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {step.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
