"""
FastAPI main application file.
Entry point for the Movie Recommendation System backend.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.routes import recommendations, movies
from backend.models.recommender import initialize_models

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Initializes ML models on startup.
    """
    print("Starting Movie Recommendation System...")
    print("Initializing ML models...")
    
    try:
        initialize_models()
        print("ML models initialized successfully!")
    except Exception as e:
        print(f"Error initializing models: {e}")
    
    yield
    
    print("Shutting down Movie Recommendation System...")

# Create FastAPI application
app = FastAPI(
    title="Movie Recommendation System API",
    description="AI-powered movie recommendations using Content-Based and Collaborative Filtering",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recommendations.router)
app.include_router(movies.router)

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Movie Recommendation System API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "health": "/health",
            "movies": "/movies",
            "content_based": "/recommend/content-based?movie_id={id}",
            "collaborative": "/recommend/collaborative?user_id={id}"
        }
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint.
    Returns API status and model availability.
    """
    from backend.models.recommender import content_recommender, collaborative_recommender
    
    return {
        "status": "healthy",
        "api_version": "1.0.0",
        "models": {
            "content_based": "ready" if content_recommender.movies_df is not None else "not initialized",
            "collaborative": "ready" if collaborative_recommender.movies_df is not None else "not initialized"
        }
    }
