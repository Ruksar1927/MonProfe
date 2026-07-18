import { Button, Container, Typography } from "@mui/material";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" fontWeight="bold">
        Dashboard
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Welcome to Exam Coach AI 
      </Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 4 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;