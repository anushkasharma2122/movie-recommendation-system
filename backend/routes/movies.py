"""
API routes for movie data operations.
Provides endpoints for retrieving movie information.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
from backend.utils.preprocessing import load_movies_data

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("")
async def get_movies(
    limit: int = Query(30, description="Number of movies to return", ge=1, le=100),
    genre: Optional[str] = Query(None, description="Filter by genre"),
    min_rating: Optional[float] = Query(None, description="Minimum rating filter", ge=0, le=10)
) -> Dict[str, Any]:
    """
    Get a list of movies with optional filters.
    
    Args:
        limit: Maximum number of movies to return
        genre: Filter movies by genre (case-insensitive)
        min_rating: Filter movies with rating >= min_rating
    
    Returns:
        Dictionary with movie list and metadata
    """
    try:
        movies_df = load_movies_data()
        
        if movies_df.empty:
            raise HTTPException(status_code=500, detail="Movie data not available")
        
        # Apply filters
        filtered_df = movies_df.copy()
        
        if genre:
            # Case-insensitive genre filtering
            filtered_df = filtered_df[
                filtered_df['genres'].str.contains(genre, case=False, na=False)
            ]
        
        if min_rating is not None:
            filtered_df = filtered_df[filtered_df['rating'] >= min_rating]
        
        # Sort by rating and limit results
        filtered_df = filtered_df.nlargest(limit, 'rating')
        
        # Convert to list of dictionaries
        movies_list = []
        for _, movie in filtered_df.iterrows():
            movies_list.append({
                'movie_id': int(movie['movie_id']),
                'title': movie['title'],
                'genres': movie['genres'],
                'director': movie['director'],
                'cast': movie['cast'],
                'rating': float(movie['rating']),
                'year': int(movie['year']),
                'description': movie['description']
            })
        
        return {
            "count": len(movies_list),
            "movies": movies_list,
            "filters": {
                "genre": genre,
                "min_rating": min_rating
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{movie_id}")
async def get_movie_by_id(movie_id: int) -> Dict[str, Any]:
    """
    Get detailed information about a specific movie.
    
    Args:
        movie_id: The ID of the movie to retrieve
    
    Returns:
        Dictionary with movie details
    """
    try:
        movies_df = load_movies_data()
        movie = movies_df[movies_df['movie_id'] == movie_id]
        
        if movie.empty:
            raise HTTPException(status_code=404, detail=f"Movie with ID {movie_id} not found")
        
        movie = movie.iloc[0]
        return {
            'movie_id': int(movie['movie_id']),
            'title': movie['title'],
            'genres': movie['genres'],
            'director': movie['director'],
            'cast': movie['cast'],
            'rating': float(movie['rating']),
            'year': int(movie['year']),
            'description': movie['description']
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
