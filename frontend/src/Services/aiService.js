import axios from "axios";

const API_URL = "http://localhost:8000";

const aiApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
aiApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Chat
export const chatAI = async (question) => {
  const response = await aiApi.post("/ai/chat", {
    question: question,
  });

  return response.data;
};


// Summary
export const generateSummary = async (data) => {
  const response = await aiApi.post("/ai/summary", data);
  return response.data;
};


// Explain Topic
export const explainTopic = async (data) => {
  const response = await aiApi.post("/ai/explain", data);
  return response.data;
};


// Quiz
export const generateQuiz = async (data) => {
  const response = await aiApi.post("/ai/quiz", data);
  return response.data;
};


// Flashcards
export const generateFlashcards = async (data) => {
  const response = await aiApi.post("/ai/flashcards", data);
  return response.data;
};


// Timetable
export const generateTimetable = async (data) => {
  const response = await aiApi.post("/ai/timetable", data);
  return response.data;
};


// Revision Plan
export const generateRevisionPlan = async (data) => {
  const response = await aiApi.post("/ai/revision-plan", data);
  return response.data;
};


// Memory Tricks
export const generateMemoryTricks = async (data) => {
  const response = await aiApi.post("/ai/memory-tricks", data);
  return response.data;
};


// Important Topics
export const generateImportantTopics = async (data) => {
  const response = await aiApi.post("/ai/important-topics", data);
  return response.data;
};


// Study Plan
export const generateStudyPlan = async (data) => {
  const response = await aiApi.post("/ai/study-plan", data);
  return response.data;
};


// Expected Questions
export const generateExpectedQuestions = async (data) => {
  const response = await aiApi.post("/ai/expected-questions", data);
  return response.data;
};


// Weak Topics
export const generateWeakTopics = async (data) => {
  const response = await aiApi.post("/ai/weak-topics", data);
  return response.data;
};


export default aiApi;