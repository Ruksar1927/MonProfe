import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

import StatCard from "../components/StatCard";

function Dashboard() {

   const [dashboardData, setDashboardData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadDashboard();
}, []);

if (!dashboardData) {
  return <h2>Loading Dashboard...</h2>;
}

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={5}
      >
        <Typography variant="h3" fontWeight="bold">
          Exam Coach AI
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Welcome 👋
      </Typography>

      <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Users"
            value={dashboardData.total_users}
          />
        </Grid>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Subjects"
            value={dashboardData.total_subjects}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Notes"
            value={dashboardData.total_notes}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="AI Chats"
            value="Coming Soon"
          />
        </Grid>

      </Grid>

    </Container>
  );
}

export default Dashboard;