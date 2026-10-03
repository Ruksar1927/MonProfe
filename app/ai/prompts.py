SUMMARY_PROMPT = """
You are an expert teacher. Summarize these study notes clearly.
Include main concepts, definitions, key points and exam tips.

Notes:
{text}
"""

QUIZ_PROMPT = """
You are an expert exam paper setter. Generate exactly 10 MCQs from the notes.

For each question provide exactly four options: A, B, C, D.
Do not show the correct answer immediately after any question.

Use this format:

Question 1: ...
A. ...
B. ...
C. ...
D. ...

Continue through Question 10.

Then provide:

ANSWER KEY:
1. A
2. B
3. C
...

Rules:
- Exactly 10 questions.
- Exactly 4 options per question.
- One correct answer per question.
- No explanations between questions.
- No tables or Markdown headings.
- Keep questions suitable for exam preparation.

Notes:
{text}
"""

FLASHCARD_PROMPT = """
You are an expert teacher. Create 8 to 10 study flashcards.

Use only this format:

Question: ...
Answer: ...

Question: ...
Answer: ...

Rules:
- Each card has exactly one Question and one Answer.
- Do not use Front, Back, bullets, tables, Markdown or numbering.
- Keep answers short and suitable for revision.

Study Notes:
{text}
"""

EXPLAIN_PROMPT = """
Explain this topic simply as if teaching a beginner.
Use clear language and helpful examples.

Topic:
{text}
"""

CHAT_PROMPT = """
You are 𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆, a friendly AI tutor.
Answer the student's question clearly and accurately.
Explain step by step when useful, give examples and keep language simple.

Student Question:
{text}
"""

TIMETABLE_PROMPT = """
Create a realistic study timetable from these details.
Divide work day-wise, include revision and short breaks, and prioritize difficult subjects.

Details:
{text}
"""

REVISION_PROMPT = """
Create an exam revision plan from these details.
Include daily targets, revision schedule, important topics and final-day strategy.

Details:
{text}
"""

MEMORY_PROMPT = """
For this topic, generate memory tricks, mnemonics, easy shortcuts and quick revision tips.

Topic:
{text}
"""

IMPORTANT_TOPICS_PROMPT = """
Analyze these study notes and identify:
- Most important topics
- Frequently asked concepts
- High-weightage areas
- Last-minute revision points

Notes:
{text}
"""

PDF_CHAT_PROMPT = """
You are an AI tutor. Answer ONLY from the provided PDF.
If the answer is not present, reply:
"I couldn't find this information in the uploaded PDF."

PDF:
{text}

Question:
{question}
"""

STUDY_PLAN_PROMPT = """
Create a detailed study timetable using:

Subjects:
{subjects}

Current Date:
{current_date}

Exam Date:
{exam_date}

Study Hours Per Day:
{hours}

Instructions:
- Calculate the remaining time between the current date and exam date.
- Do not assume a previous start date.
- Mention the total preparation duration.
- Divide study time realistically across the remaining time.
- Give a day-wise timetable.
- Mention subjects and important topics.
- Include revision and short breaks.
- Keep the schedule realistic.
- End with exam preparation tips.
"""

EXPECTED_QUESTIONS_PROMPT = """
You are an experienced exam paper setter.
Generate expected questions from these notes.

Include:
1. 5 Long Answer Questions
2. 10 Short Answer Questions
3. 10 Very Short Questions
4. 20 Viva Questions
5. Important Topics likely to appear in the exam

Notes:
{text}
"""

WEAK_TOPIC_PROMPT = """
Analyze these study notes and identify:
1. Weak Topics
2. Strong Topics
3. High Priority Topics
4. Topics requiring revision
5. Study Tips
6. Suggested revision order

Notes:
{text}
"""