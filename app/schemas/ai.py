from pydantic import BaseModel


class AIRequest(BaseModel):
    text: str


class ChatRequest(BaseModel):
    question: str


class TimetableRequest(BaseModel):
    details: str


class RevisionPlanRequest(BaseModel):
    details: str


class MemoryTrickRequest(BaseModel):
    topic: str


class ImportantTopicsRequest(BaseModel):
    text: str