import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Button, Box, CircularProgress, Card, CardContent } from "@mui/material";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try { setDashboardData(await getDashboardData()); }
      catch (error) { console.error(error); }
    };
    loadDashboard();
  }, []);

  if (!dashboardData) return (
    <Box sx={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2, color: "#5A3B23" }}>
      <CircularProgress sx={{ color: "#6B4528" }} />
      <Typography>Loading Dashboard...</Typography>
    </Box>
  );

  const features = [
    ["AI Assistant", "/aichat"], ["Quiz Generator", "/quiz"], ["Flashcards", "/flashcards"],
    ["Study Planner", "/study-planner"], ["Expected Questions", "/expected-questions"],
    ["Weak Topics", "/weak-topics"], ["Subjects", "/subjects"], ["PDF Manager", "/pdf"]
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, pb: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#4A2F1B", fontFamily: "Georgia, serif", mb: 4 }}>
        Dashboard
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3, bgcolor: "#EDE1D0", border: "1px solid #DEC9AE", boxShadow: "0 4px 14px rgba(74,47,27,0.08)" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 }, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#4A2F1B", fontFamily: "Georgia, serif" }}> Welcome to MonProfe</Typography>
            <Typography sx={{ mt: 1, color: "#6B5038", lineHeight: 1.7 }}>
              Your AI-powered study companion is ready. Learn smarter, revise faster, and achieve more.
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => navigate("/aichat")} sx={{ bgcolor: "#6B4528", color: "#FFF8EF", px: 3, borderRadius: 2, "&:hover": { bgcolor: "#4A2F1B" } }}>
            Ask AI
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {[
          ["Users", dashboardData.total_users], ["Subjects", dashboardData.total_subjects],
          ["Notes", dashboardData.total_notes], ["AI Chats", "Active"]
        ].map(([title, value]) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={title}>
            <StatCard title={title} value={value} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 700, color: "#4A2F1B", fontFamily: "Georgia, serif", mt: 6, mb: 3 }}>
        Learning Tools
      </Typography>

      <Grid container spacing={3}>
        {features.map(([title, path]) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={path}>
            <Card onClick={() => navigate(path)} sx={{
              height: "100%", cursor: "pointer", borderRadius: 3, bgcolor: "#FFFDF9",
              border: "1px solid #E1D2BE", boxShadow: "0 3px 10px rgba(74,47,27,0.06)",
              transition: "0.2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 6px 16px rgba(74,47,27,0.12)" }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#5A3B23" }}>{title}</Typography>
                <Button variant="outlined" sx={{ mt: 2, borderColor: "#8A6040", color: "#6B4528", borderRadius: 2, "&:hover": { borderColor: "#4A2F1B", bgcolor: "#F7EFE3" } }}>
                  Open
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;