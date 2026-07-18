from pydantic import BaseModel


class PDFSummaryResponse(BaseModel):
    filename: str
    summary: str
