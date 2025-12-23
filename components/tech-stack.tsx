import { Card } from "@/components/ui/card"

const technologies = [
  {
    name: "Python",
    description: "Core language for ML algorithms and data processing",
    icon: "🐍",
    category: "Backend",
  },
  {
    name: "Pandas",
    description: "Data manipulation and analysis framework",
    icon: "🐼",
    category: "Data Science",
  },
  {
    name: "NumPy",
    description: "Numerical computing and array operations",
    icon: "🔢",
    category: "Data Science",
  },
  {
    name: "Scikit-Learn",
    description: "Machine learning library for similarity metrics",
    icon: "🤖",
    category: "ML Framework",
  },
  {
    name: "React",
    description: "Modern UI library for interactive interfaces",
    icon: "⚛️",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for styling",
    icon: "🎨",
    category: "Frontend",
  },
]

export function TechStack() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Tech Stack</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Built with industry-standard tools and frameworks for machine learning and modern web development
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="group relative overflow-hidden border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Icon */}
              <div className="mb-4 text-5xl transition-transform group-hover:scale-110">{tech.icon}</div>

              {/* Category badge */}
              <div className="mb-3">
                <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary">
                  {tech.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{tech.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
