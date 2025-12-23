# Movie Recommendation System - Backend

AI-powered movie recommendation API built with FastAPI, implementing Content-Based and Collaborative Filtering algorithms.

## Features

- **Content-Based Filtering**: Recommends movies similar to a given movie based on genres, director, and cast
- **Collaborative Filtering**: Recommends movies based on user rating patterns and user-user similarity
- **RESTful API**: Clean, well-documented endpoints
- **Mock Dataset**: 30 movies with ratings for testing

## Tech Stack

- Python 3.8+
- FastAPI
- Pandas & NumPy
- Scikit-Learn
- Uvicorn

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── routes/
│   ├── recommendations.py  # Recommendation endpoints
│   └── movies.py          # Movie data endpoints
├── models/
│   └── recommender.py     # ML models (Content-Based & Collaborative)
├── utils/
│   └── preprocessing.py   # Data processing utilities
├── data/
│   ├── movies.csv         # Movie dataset
│   └── user_ratings.csv   # User rating dataset
├── requirements.txt       # Python dependencies
└── README.md
```

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
cd ..
uvicorn backend.main:app --reload
```

3. Access the API:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs

## API Endpoints

### Health Check
```
GET /health
```

### Get Movies
```
GET /movies?limit=30&genre=Action&min_rating=8.0
```

### Content-Based Recommendations
```
GET /recommend/content-based?movie_id=3&limit=10
```
Recommends movies similar to the specified movie based on content features.

### Collaborative Filtering Recommendations
```
GET /recommend/collaborative?user_id=1&limit=10
```
Recommends movies based on user preferences and similar users' ratings.

## Machine Learning Approach

### Content-Based Filtering
1. Combines movie features (genres, director, cast) into text
2. Uses TF-IDF vectorization to create feature vectors
3. Calculates cosine similarity between movies
4. Returns most similar movies

### Collaborative Filtering
1. Creates user-item rating matrix
2. Normalizes ratings to handle user bias
3. Calculates user-user similarity using cosine similarity
4. Predicts ratings using weighted average from similar users
5. Returns top predicted movies

## Dataset

- **movies.csv**: 30 movies with metadata (title, genres, director, cast, rating, year)
- **user_ratings.csv**: Sample user ratings for collaborative filtering

## Notes

- This is a demo/portfolio project with mock data
- ML models are simplified for educational purposes
- In production, use larger datasets and more sophisticated algorithms
