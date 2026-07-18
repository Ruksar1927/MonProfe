import os

from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from app.pdf.service import PDFService
from app.pdf.schemas import PDFSummaryResponse
from app.ai.service import AIService
from app.pdf import storage

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)


class PDFChatRequest(BaseModel):
    question: str


@router.post("/summary", response_model=PDFSummaryResponse)
async def pdf_summary(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = PDFService.extract_text(file_path)

    storage.pdf_text_storage = extracted_text

    summary = AIService.generate_summary(extracted_text)

    return PDFSummaryResponse(
        filename=file.filename,
        summary=summary,
    )


@router.post("/chat")
def pdf_chat(request: PDFChatRequest):

    answer = AIService.chat_with_pdf(
        storage.pdf_text_storage,
        request.question
    )

    return {
        "answer": answer
    }