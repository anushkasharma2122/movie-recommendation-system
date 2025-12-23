"""
Machine Learning models for movie recommendations.
Implements both Content-Based and Collaborative Filtering approaches.
"""

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from backend.utils.preprocessing import (
    load_movies_data,
    load_user_ratings,
    create_content_features,
    create_user_item_matrix,
    normalize_ratings
)

class ContentBasedRecommender:
    """
    Content-Based Filtering Recommender System.
    Recommends movies similar to a given movie based on content features
    (genres, director, cast).
    """
    
    def __init__(self):
        self.movies_df = None
        self.feature_matrix = None
        self.similarity_matrix = None
        
    def fit(self):
        """
        Train the content-based model.
        Loads data and computes similarity matrix.
        """
        # Load movie data
        self.movies_df = load_movies_data()
        
        if self.movies_df.empty:
            raise ValueError("Movie data is empty")
        
        # Create feature vectors from movie content
        self.feature_matrix = create_content_features(self.movies_df)
        
        # Compute cosine similarity between all movies
        # Higher similarity = more similar content
        self.similarity_matrix = cosine_similarity(self.feature_matrix)
        
        print(f"Content-based model trained on {len(self.movies_df)} movies")
    
    def recommend(self, movie_id, n_recommendations=10):
        """
        Get movie recommendations based on content similarity.
        
        Args:
            movie_id: ID of the movie to base recommendations on
            n_recommendations: Number of recommendations to return
        
        Returns:
            List of recommended movie dictionaries
        """
        # Find the index of the movie in our dataset
        movie_idx = self.movies_df[self.movies_df['movie_id'] == movie_id].index
        
        if len(movie_idx) == 0:
            return []
        
        movie_idx = movie_idx[0]
        
        # Get similarity scores for this movie with all others
        similarity_scores = list(enumerate(self.similarity_matrix[movie_idx]))
        
        # Sort movies by similarity (descending)
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        
        # Get top N similar movies (excluding the movie itself)
        top_indices = [i[0] for i in similarity_scores[1:n_recommendations+1]]
        
        # Return movie details
        recommendations = []
        for idx in top_indices:
            movie = self.movies_df.iloc[idx]
            recommendations.append({
                'movie_id': int(movie['movie_id']),
                'title': movie['title'],
                'genres': movie['genres'],
                'director': movie['director'],
                'rating': float(movie['rating']),
                'year': int(movie['year']),
                'description': movie['description'],
                'similarity_score': float(self.similarity_matrix[movie_idx][idx])
            })
        
        return recommendations


class CollaborativeFilteringRecommender:
    """
    Collaborative Filtering Recommender System.
    Recommends movies based on user rating patterns and similarities
    between users.
    """
    
    def __init__(self):
        self.movies_df = None
        self.ratings_df = None
        self.user_item_matrix = None
        self.user_similarity_matrix = None
        
    def fit(self):
        """
        Train the collaborative filtering model.
        Computes user-user similarity based on rating patterns.
        """
        # Load data
        self.movies_df = load_movies_data()
        self.ratings_df = load_user_ratings()
        
        if self.ratings_df.empty:
            raise ValueError("Ratings data is empty")
        
        # Create user-item matrix
        self.user_item_matrix = create_user_item_matrix(self.ratings_df)
        
        # Normalize ratings to handle user bias
        normalized_matrix, _ = normalize_ratings(self.user_item_matrix)
        
        # Compute user-user similarity using cosine similarity
        # Similar users have similar rating patterns
        self.user_similarity_matrix = cosine_similarity(normalized_matrix)
        
        print(f"Collaborative filtering model trained on {len(self.user_item_matrix)} users")
    
    def recommend(self, user_id, n_recommendations=10):
        """
        Get movie recommendations for a user based on collaborative filtering.
        
        Args:
            user_id: ID of the user to recommend movies for
            n_recommendations: Number of recommendations to return
        
        Returns:
            List of recommended movie dictionaries
        """
        # Check if user exists in our data
        if user_id not in self.user_item_matrix.index:
            # Return popular movies for new users (cold start problem)
            return self._get_popular_movies(n_recommendations)
        
        # Get user's index in the matrix
        user_idx = self.user_item_matrix.index.get_loc(user_id)
        
        # Get similarity scores with all other users
        user_similarities = self.user_similarity_matrix[user_idx]
        
        # Get movies the user hasn't rated yet
        user_ratings = self.user_item_matrix.iloc[user_idx]
        unrated_movies = user_ratings[user_ratings == 0].index.tolist()
        
        # Predict ratings for unrated movies using weighted average
        predicted_ratings = {}
        for movie_id in unrated_movies:
            # Find users who rated this movie
            movie_ratings = self.user_item_matrix[movie_id]
            rated_users = movie_ratings[movie_ratings > 0]
            
            if len(rated_users) == 0:
                continue
            
            # Weighted average of ratings from similar users
            weighted_sum = 0
            similarity_sum = 0
            
            for other_user_idx in rated_users.index:
                other_user_position = self.user_item_matrix.index.get_loc(other_user_idx)
                similarity = user_similarities[other_user_position]
                rating = rated_users[other_user_idx]
                
                weighted_sum += similarity * rating
                similarity_sum += abs(similarity)
            
            # Calculate predicted rating
            if similarity_sum > 0:
                predicted_ratings[movie_id] = weighted_sum / similarity_sum
        
        # Sort by predicted rating
        sorted_predictions = sorted(
            predicted_ratings.items(),
            key=lambda x: x[1],
            reverse=True
        )[:n_recommendations]
        
        # Get movie details
        recommendations = []
        for movie_id, predicted_rating in sorted_predictions:
            movie = self.movies_df[self.movies_df['movie_id'] == movie_id]
            if not movie.empty:
                movie = movie.iloc[0]
                recommendations.append({
                    'movie_id': int(movie['movie_id']),
                    'title': movie['title'],
                    'genres': movie['genres'],
                    'director': movie['director'],
                    'rating': float(movie['rating']),
                    'year': int(movie['year']),
                    'description': movie['description'],
                    'predicted_rating': float(predicted_rating)
                })
        
        return recommendations
    
    def _get_popular_movies(self, n_recommendations):
        """
        Fallback: Return most popular movies for cold start users.
        """
        popular_movies = self.movies_df.nlargest(n_recommendations, 'rating')
        
        recommendations = []
        for _, movie in popular_movies.iterrows():
            recommendations.append({
                'movie_id': int(movie['movie_id']),
                'title': movie['title'],
                'genres': movie['genres'],
                'director': movie['director'],
                'rating': float(movie['rating']),
                'year': int(movie['year']),
                'description': movie['description']
            })
        
        return recommendations


# Initialize models (singleton pattern)
content_recommender = ContentBasedRecommender()
collaborative_recommender = CollaborativeFilteringRecommender()

def initialize_models():
    """Initialize both recommendation models."""
    content_recommender.fit()
    collaborative_recommender.fit()
