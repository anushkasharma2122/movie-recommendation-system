"""
API routes for movie recommendations.
Provides endpoints for content-based and collaborative filtering.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from backend.models.recommender import content_recommender, collaborative_recommender

router = APIRouter(prefix="/recommend", tags=["Recommendations"])

@router.get("/content-based")
async def get_content_based_recommendations(
    movie_id: int = Query(..., description="ID of the movie to base recommendations on"),
    limit: int = Query(10, description="Number of recommendations to return", ge=1, le=50)
) -> Dict[str, Any]:
    """
    Get movie recommendations using Content-Based Filtering.
    
    Recommends movies with similar content (genres, director, cast) to the input movie.
    Uses cosine similarity on TF-IDF vectors of movie features.
    
    Args:
        movie_id: The movie ID to find similar movies for
        limit: Maximum number of recommendations to return
    
    Returns:
        Dictionary with recommendations and metadata
    """
    try:
        recommendations = content_recommender.recommend(movie_id, n_recommendations=limit)
        
        if not recommendations:
            raise HTTPException(
                status_code=404,
                detail=f"Movie with ID {movie_id} not found or no recommendations available"
            )
        
        return {
            "method": "content-based",
            "movie_id": movie_id,
            "count": len(recommendations),
            "recommendations": recommendations
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/collaborative")
async def get_collaborative_recommendations(
    user_id: int = Query(..., description="ID of the user to recommend movies for"),
    limit: int = Query(10, description="Number of recommendations to return", ge=1, le=50)
) -> Dict[str, Any]:
    """
    Get movie recommendations using Collaborative Filtering.
    
    Recommends movies based on rating patterns of similar users.
    Uses user-user similarity with cosine similarity on normalized ratings.
    
    Args:
        user_id: The user ID to generate recommendations for
        limit: Maximum number of recommendations to return
    
    Returns:
        Dictionary with recommendations and metadata
    """
    try:
        recommendations = collaborative_recommender.recommend(user_id, n_recommendations=limit)
        
        if not recommendations:
            raise HTTPException(
                status_code=404,
                detail=f"No recommendations available for user {user_id}"
            )
        
        return {
            "method": "collaborative-filtering",
            "user_id": user_id,
            "count": len(recommendations),
            "recommendations": recommendations
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
