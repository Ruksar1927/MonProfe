from pydantic import BaseModel


class ExpectedQuestionsRequest(BaseModel):
    text: str


class ExpectedQuestionsResponse(BaseModel):
    expected_questions: str