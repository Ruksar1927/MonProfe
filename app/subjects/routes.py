from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Subject, User
from app.schemas.subject import SubjectCreate, SubjectResponse
from app.auth.auth import get_current_user

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


# Create Subject
@router.post("/", response_model=SubjectResponse)
def create_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_subject = Subject(
        name=subject.name,
        user_id=current_user.id
    )

    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)

    return new_subject


# Get All Subjects
@router.get("/", response_model=list[SubjectResponse])
def get_subjects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Subject).filter(
        Subject.user_id == current_user.id
    ).all()


# Update Subject
@router.put("/{subject_id}", response_model=SubjectResponse)
def update_subject(
    subject_id: int,
    subject: SubjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if not db_subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found"
        )

    db_subject.name = subject.name

    db.commit()
    db.refresh(db_subject)

    return db_subject


# Delete Subject
@router.delete("/{subject_id}")
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if not db_subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found"
        )

    db.delete(db_subject)
    db.commit()

    return {
        "message": "Subject deleted successfully"
    }