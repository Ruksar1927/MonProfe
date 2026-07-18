SUMMARY_PROMPT = """
You are an expert teacher.

Summarize the following study notes in a clear and structured format.

Focus on:
- Main concepts
- Important definitions
- Key points
- Exam tips

Notes:
{text}
"""


QUIZ_PROMPT = """
You are an exam paper setter.

Generate 10 multiple-choice questions from these notes.

Each question should have:
- Question
- Four options
- Correct answer

Notes:
{text}
"""


FLASHCARD_PROMPT = """
Create flashcards from the following notes.

Each flashcard should contain:

Front:
Back:

Notes:
{text}
"""


EXPLAIN_PROMPT = """
Explain the following topic in simple language.

Imagine you're teaching a beginner.

Topic:
{text}
"""


CHAT_PROMPT = """
You are Exam Coach AI.

You are a friendly AI tutor.

Answer the student's question clearly and accurately.

If possible:
- Explain step by step.
- Give examples.
- Keep the language simple.
- Help the student prepare for exams.

Student Question:
{text}
"""


TIMETABLE_PROMPT = """
You are an expert study planner.

Create a personalized study timetable.

Details:
{text}

Rules:
- Divide work day-wise.
- Include revision sessions.
- Include short breaks.
- Prioritize difficult subjects first.
- Keep the timetable realistic.
"""


REVISION_PROMPT = """
You are an expert exam mentor.

Create a revision plan.

Details:
{text}

Include:
- Daily targets
- Revision schedule
- Important topics
- Final day strategy
"""


MEMORY_PROMPT = """
You are a memory expert.

For the following topic:

{text}

Generate:
- Memory tricks
- Mnemonics
- Easy shortcuts
- Quick revision tips
"""


IMPORTANT_TOPICS_PROMPT = """
Analyze the following study material.

{text}

Extract:
- Most important topics
- Frequently asked concepts
- High-weightage areas
- Last-minute revision points
"""

PDF_CHAT_PROMPT = """
You are an AI tutor.

Answer ONLY from the provided PDF.

If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

PDF:

{text}

Question:

{question}
"""

STUDY_PLAN_PROMPT = """
You are an expert study planner.

Create a detailed study timetable.

Student Information:

Subjects:
{subjects}

Exam Date:
{exam_date}

Available Study Hours Per Day:
{hours}

Instructions:

- Divide the study time evenly.
- Give a day-wise timetable.
- Mention which subject to study.
- Include revision sessions.
- Mention important topics to focus on.
- Keep the schedule realistic.
- Add short breaks where necessary.
- End with exam preparation tips.
"""

EXPECTED_QUESTIONS_PROMPT = """
You are an experienced exam paper setter.

Generate the most expected exam questions from the following notes.

Include:

1. Long Answer Questions (5)
2. Short Answer Questions (10)
3. Very Short Questions (10)
4. Viva Questions (20)
5. Important Topics likely to appear in the exam

Notes:

{text}
"""

WEAK_TOPIC_PROMPT = """
You are an expert exam coach.

Analyze the following study notes.

Identify:

1. Weak Topics (difficult concepts)
2. Strong Topics (easy concepts)
3. High Priority Topics
4. Topics requiring revision
5. Study Tips
6. Suggested revision order

Notes:

{text}
"""