from pydantic import BaseModel


class StudyPlanRequest(BaseModel):
    subjects: str
    exam_date: str
    hours: str


class StudyPlanResponse(BaseModel):
    study_plan: str