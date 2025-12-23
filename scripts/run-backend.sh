#!/bin/bash

# Script to run the FastAPI backend server
# Usage: ./scripts/run-backend.sh

echo "Starting Movie Recommendation System Backend..."
echo "========================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is not installed"
    exit 1
fi

# Install dependencies if needed
echo "Checking dependencies..."
pip3 install -r backend/requirements.txt --quiet

# Run the FastAPI server
echo ""
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "Interactive docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"

uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
