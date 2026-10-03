import { useState } from "react";
import { generateQuiz } from "../services/aiService";
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress, Box } from "@mui/material";

function Quiz() {
  const [text, setText] = useState(""), [quiz, setQuiz] = useState(""), [loading, setLoading] = useState(false);

  const cleanQuiz = (text) => text.replace(/#{1,6}\s*/g, "").replace(/\*\*/g, "").replace(/^\s*\*\s*/gm, "").trim();

  const handleGenerate = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true); setQuiz("");
      const response = await generateQuiz({ text });
      setQuiz(response.quiz);
    } catch (error) {
      console.error(error); setQuiz("Failed to generate quiz.");
    } finally { setLoading(false); }
  };

  const renderQuiz = (text) => {
    const cleaned = cleanQuiz(text);
    const match = cleaned.match(/ANSWER\s*KEY\s*:([\s\S]*)/i);
    const answerKey = match ? match[1].trim() : "";
    const questionText = match ? cleaned.slice(0, match.index).trim() : cleaned;
    const questions = questionText.split(/(?=Question\s*\d+\s*:)/i).filter(Boolean);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {questions.map((question, index) => {
          const lines = question.trim().split("\n").filter(Boolean);
          const title = lines[0];
          const options = lines.slice(1).filter((line) => /^[A-D]\./i.test(line));

          return (
            <Card key={index} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>{title}</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {options.map((option, i) => <Typography key={i} sx={{ lineHeight: 1.7 }}>{option}</Typography>)}
                </Box>
              </CardContent>
            </Card>
          );
        })}

        {answerKey && (
          <Card sx={{ mt: 1, borderRadius: 2, backgroundColor: "#f8f5f6" }}>
            <CardContent>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>Answer Key</Typography>
              <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{answerKey}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5, lineHeight: 1.25 }}>
        𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 AI Quiz Generator
      </Typography>

      <TextField
        multiline rows={8} fullWidth label="Enter notes or topic"
        value={text} onChange={(e) => setText(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </Button>

      {loading && <Box sx={{ mt: 3 }}><CircularProgress /></Box>}

      {quiz && (
        <Card sx={{ mt: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Generated Quiz</Typography>
            {renderQuiz(quiz)}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Quiz;