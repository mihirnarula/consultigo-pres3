# Firebase Realtime Database Project

A simple project demonstrating Firebase Realtime Database integration with a simple frontend and FastAPI backend.

## Project Structure

```
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── backend/
    ├── main.py
    └── requirements.txt
```

## Frontend

The frontend is a simple web application that allows users to:
- Add new messages to the Firebase Realtime Database
- View messages from the database in real-time

### Setup

1. Open `frontend/script.js` and replace the Firebase configuration with your actual Firebase project configuration.
2. Serve the frontend files using a web server (you can use extensions like Live Server in VS Code).

## Backend

The backend is a FastAPI application that:
- Connects to Firebase Realtime Database using the Admin SDK
- Provides REST API endpoints to interact with the database

### Setup

1. Install the required dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

2. Make sure your Firebase service account key is at the correct location:
   ```
   C:/Users/Narula/Downloads/webdevai-real-firebase-adminsdk-fbsvc-8dbc768d47.json
   ```

3. Start the FastAPI server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

4. The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /ping`: Simple health check that returns "pong"
- `GET /api/messages`: Get all messages from the database
- `POST /api/messages`: Add a new message to the database

## Notes

- For production use, you should secure your Firebase configuration and service account key.
- The frontend and backend can be run independently. The frontend connects directly to Firebase, while the backend uses the Admin SDK.
- The CORS middleware in the backend is configured to allow requests from any origin for development purposes. For production, you should restrict it to specific origins. 