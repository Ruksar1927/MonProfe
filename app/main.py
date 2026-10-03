from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import database components
from app.database.db import engine, Base
from app.database import models

# Import routers
from app.auth.routes import router as auth_router
from app.subjects.routes import router as subject_router
from app.notes.routes import router as notes_router
from app.ai.routes import router as ai_router
from app.pdf.routes import router as pdf_router
from app.dashboard.routes import router as dashboard_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="AI Exam Coach",
    version="1.0.0"
)

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------

# Register routers
app.include_router(auth_router)
app.include_router(subject_router)
app.include_router(notes_router)
app.include_router(ai_router)
app.include_router(pdf_router)
app.include_router(dashboard_router)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to MonProfe"
    }



