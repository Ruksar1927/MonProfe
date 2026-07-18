from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import shutil
import os

from app.database.db import get_db
from app.database.models import Note, Subject, User
from app.schemas.note import NoteResponse
from app.auth.auth import get_current_user

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


@router.post("/upload", response_model=NoteResponse)
def upload_note(
    subject_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check if subject belongs to current user
    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found"
        )

    # Check filename
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected"
        )

    # Allow only PDF files
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Create upload folder if it doesn't exist
    os.makedirs("app/uploads", exist_ok=True)

    # Save file
    filename = file.filename
    file_path = os.path.join("app", "uploads", filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save note in database
    new_note = Note(
        title=filename,
        file_path=file_path,
        subject_id=subject.id
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note