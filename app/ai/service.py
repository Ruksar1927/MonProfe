from app.ai.client import client
from datetime import date
from app.ai.prompts import (
    SUMMARY_PROMPT,
    QUIZ_PROMPT,
    FLASHCARD_PROMPT,
    EXPLAIN_PROMPT,
    CHAT_PROMPT,
    TIMETABLE_PROMPT,
    REVISION_PROMPT,
    MEMORY_PROMPT,
    IMPORTANT_TOPICS_PROMPT,
    PDF_CHAT_PROMPT,
    STUDY_PLAN_PROMPT,
    EXPECTED_QUESTIONS_PROMPT,
    WEAK_TOPIC_PROMPT,
)


class AIService:

    MODEL_NAME = "gemini-flash-lite-latest"

    @staticmethod
    def generate_summary(text: str):
        prompt = SUMMARY_PROMPT.format(text=text)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_quiz(text: str):
        prompt = QUIZ_PROMPT.format(text=text)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_flashcards(text: str):
        prompt = FLASHCARD_PROMPT.format(text=text)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def explain_topic(text: str):
        prompt = EXPLAIN_PROMPT.format(text=text)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def chat(question: str):
        prompt = CHAT_PROMPT.format(text=question)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_timetable(details: str):
        prompt = TIMETABLE_PROMPT.format(text=details)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_revision_plan(details: str):
        prompt = REVISION_PROMPT.format(text=details)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_memory_tricks(topic: str):
        prompt = MEMORY_PROMPT.format(text=topic)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_important_topics(text: str):
        prompt = IMPORTANT_TOPICS_PROMPT.format(text=text)

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def chat_with_pdf(text: str, question: str):

        prompt = PDF_CHAT_PROMPT.format(
            text=text,
            question=question
        )

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_study_plan(subjects: str, exam_date: str, hours: str):

        current_date = date.today()

        prompt = STUDY_PLAN_PROMPT.format(
            subjects=subjects,
            current_date=current_date,
            exam_date=exam_date,
            hours=hours
   )

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def generate_expected_questions(text: str):

        prompt = EXPECTED_QUESTIONS_PROMPT.format(
            text=text
        )

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text

    @staticmethod
    def analyze_weak_topics(text: str):

        prompt = WEAK_TOPIC_PROMPT.format(
            text=text
        )

        response = client.models.generate_content(
            model=AIService.MODEL_NAME,
            contents=prompt,
        )

        return response.text