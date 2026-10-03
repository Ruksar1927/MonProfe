import os
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.db import get_db
from app.database.models import Note, Subject, User
from app.auth.auth import get_current_user
from app.pdf.service import PDFService
from app.ai.service import AIService
from app.pdf.schemas import PDFSummaryResponse

router = APIRouter(prefix="/pdf", tags=["PDF"])

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt", ".pptx", ".xlsx"}


class PDFChatRequest(BaseModel):
    pdf_id: int
    question: str


def save_and_extract(file: UploadFile):
    ext = Path(file.filename).suffix.lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Use PDF, DOCX, TXT, PPTX or XLSX."
        )

    os.makedirs("uploads", exist_ok=True)
    return Path("uploads") / file.filename, ext


@router.post("/upload")
async def upload_pdf(
    subject_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.user_id == current_user.id
    ).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    file_path, _ = save_and_extract(file)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        PDFService.extract_text(str(file_path))
    except Exception:
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=400, detail="Could not read this file")

    document = Note(
        title=file.filename,
        file_path=str(file_path),
        subject_id=subject_id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "message": "File uploaded successfully",
        "id": document.id
    }


@router.get("/")
def get_pdfs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Note).join(Subject).filter(
        Subject.user_id == current_user.id
    ).all()


@router.delete("/{pdf_id}")
def delete_pdf(
    pdf_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    document = db.query(Note).join(Subject).filter(
        Note.id == pdf_id,
        Subject.user_id == current_user.id
    ).first()

    if not document:
        raise HTTPException(status_code=404, detail="File not found")

    file_path = Path(document.file_path)

    if not file_path.is_absolute():
        file_path = Path.cwd() / file_path

    if file_path.exists():
        file_path.unlink()

    db.delete(document)
    db.commit()

    return {"message": "File deleted successfully"}


@router.post("/summary", response_model=PDFSummaryResponse)
async def pdf_summary(file: UploadFile = File(...)):
    file_path, _ = save_and_extract(file)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        extracted_text = PDFService.extract_text(str(file_path))
    except Exception:
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=400, detail="Could not read this file")

    return PDFSummaryResponse(
        filename=file.filename,
        summary=AIService.generate_summary(extracted_text)
    )


@router.post("/chat")
def pdf_chat(
    request: PDFChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    document = db.query(Note).join(Subject).filter(
        Note.id == request.pdf_id,
        Subject.user_id == current_user.id
    ).first()

    if not document:
        raise HTTPException(status_code=404, detail="File not found")

    file_path = Path(document.file_path)

    if not file_path.is_absolute():
        file_path = Path.cwd() / file_path

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF file does not exist"
        )

    try:
        text = PDFService.extract_text(str(file_path))
    except Exception as e:
        print("PDF CHAT READ ERROR:", e)
        raise HTTPException(
            status_code=400,
            detail="Could not read this file"
        )

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in this file"
        )

    return {
        "answer": AIService.chat_with_pdf(text, request.question)
    }