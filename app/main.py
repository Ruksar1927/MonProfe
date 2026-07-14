from fastapi import FastAPI
# Import database components
from app.database.db import engine, Base
from app.database import models
from app.auth.routes import router as auth_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="AI Exam Coach",
    version="1.0.0"
)

app.include_router(auth_router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to AI Exam Coach"
    }



