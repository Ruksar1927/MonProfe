from pydantic import BaseModel


class NoteResponse(BaseModel):
    id: int
    title: str
    file_path: str

    class Config:
        from_attributes = True