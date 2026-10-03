import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import PDF from "./pages/PDF";
import AIChat from "./pages/AIChat";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import StudyPlanner from "./pages/StudyPlanner";
import ExpectedQuestions from "./pages/ExpectedQuestions";
import WeakTopics from "./pages/WeakTopics";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/subjects" element={<Subjects />} />

          <Route path="/pdf" element={<PDF />} />

          <Route path="/aichat" element={<AIChat />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/flashcards" element={<Flashcards />} />

          <Route path="/study-planner" element={<StudyPlanner />} />

          <Route
            path="/expected-questions"
            element={<ExpectedQuestions />}
          />

          <Route path="/weak-topics" element={<WeakTopics />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;