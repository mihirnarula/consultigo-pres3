from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, db
from typing import Dict, Any
import os
import json

# Initialize FastAPI app
app = FastAPI(title="Firebase Realtime Database API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to service account key
service_account_path = r"C:/Users/Narula/Downloads/webdevai-real-firebase-adminsdk-fbsvc-8dbc768d47.json"

# Initialize Firebase Admin
try:
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://webdevai-real-default-rtdb.firebaseio.com'
    })
    print("Firebase Admin SDK initialized successfully")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")
    # In a production app, you might want to raise an exception here
    # We'll continue to allow the API to start even if Firebase fails

# Routes
@app.get("/")
async def root():
    return {"message": "Firebase Realtime Database API"}

@app.get("/ping")
async def ping():
    return "pong"

@app.get("/api/messages")
async def get_messages():
    try:
        ref = db.reference('messages')
        messages = ref.get()
        # If no messages exist, return an empty list
        if not messages:
            return []
        
        # Convert to list and sort by timestamp (newest first)
        messages_list = [{"id": key, **value} for key, value in messages.items()]
        messages_list.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
        
        return messages_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/messages")
async def create_message(message: Dict[str, Any] = Body(...)):
    try:
        # Validate required fields
        if "name" not in message or "message" not in message:
            raise HTTPException(
                status_code=400, 
                detail="Message must contain 'name' and 'message' fields"
            )
        
        # Create a reference to the messages collection
        ref = db.reference('messages')
        
        # Add server timestamp
        message_data = {
            "name": message["name"],
            "message": message["message"],
            "timestamp": {".sv": "timestamp"}  # Server value for timestamp
        }
        
        # Push the new message
        new_message = ref.push(message_data)
        
        return {"id": new_message.key, "success": True}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True) 