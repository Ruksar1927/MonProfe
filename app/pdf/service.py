import os
import fitz
from docx import Document


class PDFService:

    @staticmethod
    def extract_text(file_path: str):
        ext = os.path.splitext(file_path)[1].lower()

        if ext == ".pdf":
            document = fitz.open(file_path)
            text = ("\n".join(page.get_text() for page in document))
            document.close()
            return text

        if ext == ".docx":
            document = Document(file_path)
            return "\n".join(p.text for p in document.paragraphs)

        if ext == ".txt":
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()

        raise ValueError(f"Unsupported file type: {ext}")