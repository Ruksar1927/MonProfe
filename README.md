# MonProfe - AI Study Assistant

MonProfe is an AI-powered study assistant that helps students learn smarter from their own notes. Students can upload PDFs/notes and instantly get summaries, explanations, quizzes, flashcards, expected exam questions, and chat with their documents.

### Key Features
- Smart Upload: Upload PDFs, notes, and study materials
- AI Summarization: Get concise summaries and simple explanations
- Active Learning: Auto-generates quizzes, flashcards, and expected questions
- Chat with Notes (RAG): Ask any question from your uploaded documents
- Secure & Personal: User authentication with JWT

### Tech Stack
- Backend: Python, FastAPI
- Frontend: React, Vite, Tailwind CSS
- Database: SQLite with SQLAlchemy
- AI & Search: Google Gemini API, LangChain, FAISS
- Auth: JWT Authentication

### How to Run Locally
1. Clone the repository
- git clone https://github.com/Ruksar1927/MonProfe.git
- cd MonProfe

2. Backend Setup
- python -m venv venv
- venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn app.main:app --reload

3. Frontend Setup
- cd frontend
- npm install
- npm run dev

4. Environment Variables
Create a .env file in the root and add:
- GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_jwt_secret_key

Backend will run on http://localhost:8000 and frontend on http://localhost:5173

### Author
Built by Ruksar
