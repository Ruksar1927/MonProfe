from fastapi import APIRouter
from app.ai.service import AIService
from app.schemas.ai import (
    AIRequest,
    ChatRequest,
    TimetableRequest,
    RevisionPlanRequest,
    MemoryTrickRequest,
    ImportantTopicsRequest,
)

from app.schemas.study_plan import (
    StudyPlanRequest,
    StudyPlanResponse,
)

from app.schemas.expected_questions import (
    ExpectedQuestionsRequest,
    ExpectedQuestionsResponse,
)

from app.schemas.weak_topic import (
    WeakTopicRequest,
    WeakTopicResponse,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/summary")
def generate_summary(request: AIRequest):

    summary = AIService.generate_summary(request.text)

    return {
        "summary": summary
    }


@router.post("/quiz")
def generate_quiz(request: AIRequest):

    quiz = AIService.generate_quiz(request.text)

    return {
        "quiz": quiz
    }


@router.post("/flashcards")
def generate_flashcards(request: AIRequest):

    flashcards = AIService.generate_flashcards(request.text)

    return {
        "flashcards": flashcards
    }


@router.post("/explain")
def explain_topic(request: AIRequest):

    explanation = AIService.explain_topic(request.text)

    return {
        "explanation": explanation
    }


@router.post("/chat")
def chat(request: ChatRequest):

    answer = AIService.chat(request.question)

    return {
        "response": answer
    }


@router.post("/timetable")
def timetable(request: TimetableRequest):

    timetable = AIService.generate_timetable(request.details)

    return {
        "timetable": timetable
    }


@router.post("/revision-plan")
def revision_plan(request: RevisionPlanRequest):

    plan = AIService.generate_revision_plan(request.details)

    return {
        "revision_plan": plan
    }


@router.post("/memory-tricks")
def memory_tricks(request: MemoryTrickRequest):

    tricks = AIService.generate_memory_tricks(request.topic)

    return {
        "memory_tricks": tricks
    }


@router.post("/important-topics")
def important_topics(request: ImportantTopicsRequest):

    topics = AIService.generate_important_topics(request.text)

    return {
        "important_topics": topics
    }

@router.post(
    "/study-plan",
    response_model=StudyPlanResponse
)
def generate_study_plan(request: StudyPlanRequest):

    plan = AIService.generate_study_plan(
        request.subjects,
        request.exam_date,
        request.hours,
    )

    return StudyPlanResponse(
        study_plan=plan
    )

@router.post(
    "/expected-questions",
    response_model=ExpectedQuestionsResponse
)
def generate_expected_questions(request: ExpectedQuestionsRequest):

    questions = AIService.generate_expected_questions(
        request.text
    )

    return ExpectedQuestionsResponse(
        expected_questions=questions
    )

@router.post(
    "/weak-topics",
    response_model=WeakTopicResponse
)
def analyze_weak_topics(request: WeakTopicRequest):

    analysis = AIService.analyze_weak_topics(
        request.text
    )

    return WeakTopicResponse(
        analysis=analysis
    )
