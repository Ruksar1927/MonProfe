import { useEffect, useState } from "react";
import { generateStudyPlan } from "../services/aiService";
import { getSubjects } from "../services/subjectService";
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Box } from "@mui/material";

function StudyPlanner() {
  const [subjects, setSubjects] = useState([]), [availableSubjects, setAvailableSubjects] = useState([]), [examDate, setExamDate] = useState(""), [hours, setHours] = useState(""), [plan, setPlan] = useState(""), [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubjects().then(setAvailableSubjects).catch(console.error);
  }, []);

  const cleanPlan = (text) => text?.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").replace(/^\s*[*-]\s*/gm, "").trim() || "";

  const handleGenerate = async () => {
    if (!subjects.length || !examDate || !hours) return alert("Please fill all fields.");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(examDate) <= today) return alert("Please select a future exam date.");
    if (Number(hours) <= 0 || Number(hours) > 24) return alert("Study hours must be between 1 and 24.");

    try {
      setLoading(true); setPlan("");
      const response = await generateStudyPlan({ subjects: subjects.join(", "), exam_date: examDate, hours });
      setPlan(response.study_plan);
    } catch (error) {
      console.error(error); setPlan("Failed to generate study plan.");
    } finally { setLoading(false); }
  };

  const renderPlan = (text) => (
    <Box sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#3f332b" }}>
      {cleanPlan(text)}
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 1, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5, lineHeight: 1.25, color: "#4a382b" }}>
        𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 AI Study Planner
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ "&.Mui-focused": { color: "#795548" } }}>Select Subjects</InputLabel>
        <Select
          multiple value={subjects} label="Select Subjects"
          onChange={(e) => setSubjects(e.target.value)}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            backgroundColor: "#fffdf9",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d8c7b5" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9a7658" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#795548" }
          }}
        >
          {availableSubjects.map((subject) => (
            <MenuItem key={subject.id} value={subject.name} sx={{ "&.Mui-selected": { bgcolor: "#E7D5BD !important", color: "#4A2F1B" }, "&.Mui-selected:hover": { bgcolor: "#D8BFA3 !important" }, "&:hover": { bgcolor: "#F3E5D0" } }}>
              <Checkbox checked={subjects.includes(subject.name)} sx={{ color: "#795548", "&.Mui-checked": { color: "#795548" } }} />
              <ListItemText primary={subject.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth type="date" label="Exam Date" value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fffdf9",
            "& fieldset": { borderColor: "#d8c7b5" },
            "&:hover fieldset": { borderColor: "#9a7658" },
            "&.Mui-focused fieldset": { borderColor: "#795548" }
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#795548" }
        }}
      />

      <TextField
        fullWidth type="number" label="Study Hours Per Day" value={hours}
        onChange={(e) => setHours(e.target.value)}
        sx={{
          mb: 2,
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
        onClick={handleGenerate}
        disabled={loading}
        sx={{ px: 3, borderRadius: 2, backgroundColor: "#795548", "&:hover": { backgroundColor: "#5d4037" } }}
      >
        {loading ? "Generating..." : "Generate Study Plan"}
      </Button>

      {loading && <Box sx={{ mt: 3 }}><CircularProgress sx={{ color: "#795548" }} /></Box>}

      {plan && (
        <Card sx={{ mt: 4, borderRadius: 3, border: "1px solid #d8c7b5", boxShadow: "0 3px 12px rgba(91,70,54,0.08)", backgroundColor: "#fffdf9" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3} sx={{ color: "#4a382b" }}>
              Your Study Plan
            </Typography>
            {renderPlan(plan)}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default StudyPlanner;