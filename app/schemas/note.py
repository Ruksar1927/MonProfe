from pydantic import BaseModel


class NoteResponse(BaseModel):
    id: int
    title: str
    file_path: str
    subject_id: int

    class Config:
        from_attributes = True