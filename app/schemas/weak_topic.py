from pydantic import BaseModel


class WeakTopicRequest(BaseModel):
    text: str


class WeakTopicResponse(BaseModel):
    analysis: str