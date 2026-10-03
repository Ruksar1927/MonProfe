import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateWeakTopics } from "../services/aiService";
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress, Box } from "@mui/material";

function WeakTopics() {
  const [text, setText] = useState(""), [analysis, setAnalysis] = useState(""), [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      const response = await generateWeakTopics({ text });
      setAnalysis(response.analysis);
    } catch (error) {
      console.error(error);
      setAnalysis("Failed to analyze weak topics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "#4b2e20", lineHeight: 1.25 }}>
        𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 Weak Topics Analyzer
      </Typography>

      <Card sx={{ borderRadius: 3, backgroundColor: "#f8f1e7", boxShadow: "0 4px 14px rgba(75,46,32,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <TextField
            multiline rows={8} fullWidth
            label="Enter your notes, answers, or study history"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": { backgroundColor: "#fffaf4", borderRadius: 2 },
              "& .MuiInputLabel-root": { color: "#795548" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#8b5e3c" }
            }}
          />

          <Button
            variant="contained"
            sx={{ mt: 3, px: 3, backgroundColor: "#6f4934", "&:hover": { backgroundColor: "#553626" } }}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Weak Topics"}
          </Button>
        </CardContent>
      </Card>

      {loading && <Box sx={{ mt: 3, textAlign: "center" }}><CircularProgress sx={{ color: "#6f4934" }} /></Box>}

      {analysis && (
        <Card sx={{ mt: 4, borderRadius: 3, backgroundColor: "#fffaf4", boxShadow: "0 4px 14px rgba(75,46,32,0.08)" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: "#4b2e20" }}>
              Weak Topic Analysis
            </Typography>
            <Box sx={{ color: "#4b3a30", lineHeight: 1.8, "& p": { mb: 2 }, "& li": { mb: 1 } }}>
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default WeakTopics;