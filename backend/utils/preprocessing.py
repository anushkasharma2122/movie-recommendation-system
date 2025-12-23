"""
Data preprocessing utilities for the movie recommendation system.
Handles data loading, cleaning, and feature engineering.
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
import os

def load_movies_data():
    """
    Load movie dataset from CSV file.
    Returns a pandas DataFrame with movie information.
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(current_dir, '..', 'data', 'movies.csv')
    
    try:
        movies_df = pd.read_csv(data_path)
        return movies_df
    except FileNotFoundError:
        print(f"Error: movies.csv not found at {data_path}")
        return pd.DataFrame()

def load_user_ratings():
    """
    Load user ratings dataset from CSV file.
    Returns a pandas DataFrame with user-movie ratings.
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(current_dir, '..', 'data', 'user_ratings.csv')
    
    try:
        ratings_df = pd.read_csv(data_path)
        return ratings_df
    except FileNotFoundError:
        print(f"Error: user_ratings.csv not found at {data_path}")
        return pd.DataFrame()

def preprocess_genres(movies_df):
    """
    Convert genre strings into binary encoded vectors.
    Splits genres by '|' and creates one-hot encoding.
    
    Args:
        movies_df: DataFrame with 'genres' column
    
    Returns:
        Binary encoded genre matrix
    """
    # Split genres by pipe delimiter
    genres_split = movies_df['genres'].str.split('|')
    
    # Use MultiLabelBinarizer for one-hot encoding
    mlb = MultiLabelBinarizer()
    genre_matrix = mlb.fit_transform(genres_split)
    
    return genre_matrix, mlb.classes_

def create_content_features(movies_df):
    """
    Create feature vectors for content-based filtering.
    Combines genres, director, and cast information using TF-IDF.
    
    Args:
        movies_df: DataFrame with movie information
    
    Returns:
        Feature matrix for content-based similarity calculation
    """
    # Combine text features: genres, director, cast
    movies_df['combined_features'] = (
        movies_df['genres'].fillna('') + ' ' +
        movies_df['director'].fillna('') + ' ' +
        movies_df['cast'].str.replace('|', ' ').fillna('')
    )
    
    # Use TF-IDF to vectorize the combined features
    tfidf = TfidfVectorizer(stop_words='english', max_features=500)
    feature_matrix = tfidf.fit_transform(movies_df['combined_features'])
    
    return feature_matrix

def create_user_item_matrix(ratings_df):
    """
    Create user-item rating matrix for collaborative filtering.
    Rows represent users, columns represent movies, values are ratings.
    
    Args:
        ratings_df: DataFrame with user_id, movie_id, rating columns
    
    Returns:
        User-item matrix as pandas DataFrame
    """
    # Pivot the ratings to create user-item matrix
    user_item_matrix = ratings_df.pivot_table(
        index='user_id',
        columns='movie_id',
        values='rating',
        fill_value=0  # Fill missing ratings with 0
    )
    
    return user_item_matrix

def normalize_ratings(user_item_matrix):
    """
    Normalize user ratings by subtracting mean rating per user.
    This helps handle rating bias across different users.
    
    Args:
        user_item_matrix: User-item rating matrix
    
    Returns:
        Normalized user-item matrix
    """
    # Calculate mean rating per user (ignoring zeros)
    user_means = user_item_matrix.replace(0, np.nan).mean(axis=1)
    
    # Subtract mean from each user's ratings
    normalized_matrix = user_item_matrix.sub(user_means, axis=0)
    normalized_matrix = normalized_matrix.fillna(0)
    
    return normalized_matrix, user_means
