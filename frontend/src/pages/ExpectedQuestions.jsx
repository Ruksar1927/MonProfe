import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateExpectedQuestions } from "../services/aiService";
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress, Box } from "@mui/material";

function ExpectedQuestions() {
  const [text, setText] = useState(""), [questions, setQuestions] = useState(""), [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      const response = await generateExpectedQuestions({ text });
      setQuestions(response.expected_questions);
    } catch (error) {
      console.error(error);
      setQuestions("Failed to generate expected questions.");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5, lineHeight: 1.25, color: "#4a382b" }}>
        𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 Expected Questions
      </Typography>

      <TextField
        multiline rows={8} fullWidth label="Enter notes or chapter content"
        value={text} onChange={(e) => setText(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fffdf9",
            "& fieldset": { borderColor: "#d8c7b5" },
            "&:hover fieldset": { borderColor: "#9a7658" },
            "&.Mui-focused fieldset": { borderColor: "#795548" }
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#795548" }
        }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2, px: 3, borderRadius: 2, backgroundColor: "#795548", "&:hover": { backgroundColor: "#5d4037" } }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </Button>

      {loading && <Box sx={{ mt: 3 }}><CircularProgress sx={{ color: "#795548" }} /></Box>}

      {questions && (
        <Card sx={{ mt: 4, borderRadius: 3, border: "1px solid #d8c7b5", boxShadow: "0 3px 12px rgba(91,70,54,0.08)", backgroundColor: "#fffdf9" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: "#4a382b" }}>
              Expected Exam Questions
            </Typography>

            <Box sx={{ color: "#3f332b", lineHeight: 1.8, "& p": { mb: 2 }, "& li": { mb: 1 } }}>
              <ReactMarkdown>{questions}</ReactMarkdown>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default ExpectedQuestions;