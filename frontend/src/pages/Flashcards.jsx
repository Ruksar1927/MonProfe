import { useState } from "react";
import { generateFlashcards } from "../services/aiService";
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress, Box } from "@mui/material";

function Flashcards() {
  const [text, setText] = useState(""), [flashcards, setFlashcards] = useState(""), [loading, setLoading] = useState(false);

  const cleanText = (text) => text?.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").replace(/^\s*[*-]\s*/gm, "").replace(/^(Front|Question)\s*:\s*/gim, "").replace(/^(Back|Answer)\s*:\s*/gim, "").trim() || "";

  const renderFlashcards = (text) => {
    const cards = text.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").split(/(?=Question\s*:|Front\s*:)/i).filter((card) => card.trim());

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {cards.map((card, index) => {
          const parts = card.split(/Answer\s*:|Back\s*:/i);
          const question = cleanText(parts[0]), answer = cleanText(parts.slice(1).join(" "));

          return (
            <Card key={index} sx={{ borderRadius: 3, border: "1px solid #d8c7b5", boxShadow: "0 3px 12px rgba(91, 70, 54, 0.08)", backgroundColor: "#fffdf9" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ backgroundColor: "#f3e7d8", borderRadius: 2, p: 2, mb: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 1, color: "#5b4636" }}>Question</Typography>
                  <Typography sx={{ lineHeight: 1.8, color: "#3f332b", whiteSpace: "pre-wrap" }}>{question}</Typography>
                </Box>

                {answer && (
                  <Box sx={{ backgroundColor: "#eee4d8", borderRadius: 2, p: 2 }}>
                    <Typography fontWeight="bold" sx={{ mb: 1, color: "#5b4636" }}>Answer</Typography>
                    <Typography sx={{ lineHeight: 1.8, color: "#3f332b", whiteSpace: "pre-wrap" }}>{answer}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true); setFlashcards("");
      const response = await generateFlashcards({ text });
      setFlashcards(response.flashcards);
    } catch (error) {
      console.error(error); setFlashcards("Failed to generate flashcards.");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 1, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5, lineHeight: 1.25, color: "#4a382b" }}>
        𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 AI Flashcards
      </Typography>

      <TextField
        multiline rows={8} fullWidth label="Enter notes or topic"
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
        sx={{
          mt: 2, px: 3, borderRadius: 2, backgroundColor: "#795548",
          "&:hover": { backgroundColor: "#5d4037" }
        }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </Button>

      {loading && <Box sx={{ mt: 3 }}><CircularProgress sx={{ color: "#795548" }} /></Box>}

      {flashcards && (
        <Card sx={{ mt: 4, borderRadius: 3, border: "1px solid #d8c7b5", boxShadow: "0 3px 12px rgba(91, 70, 54, 0.08)", backgroundColor: "#fffdf9" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: "#4a382b" }}>
              Generated Flashcards
            </Typography>
            {renderFlashcards(flashcards)}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Flashcards;