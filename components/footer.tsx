import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-xl font-semibold text-foreground">AI Movie Recommendation System</h3>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              A production-grade machine learning project demonstrating content-based and collaborative filtering
              techniques for personalized movie recommendations. Built with Python, Pandas, NumPy, Scikit-Learn, React,
              and Tailwind CSS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="bg-card/50 hover:bg-primary hover:text-primary-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-card/50 hover:bg-secondary hover:text-secondary-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="bg-card/50 hover:bg-accent hover:text-accent-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/30 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Movie Recommender. Built for learning and portfolio showcase.
          </p>
        </div>
      </div>
    </footer>
  )
}
