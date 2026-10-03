import { useEffect, useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { getCurrentUser } from "../services/authService";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#8B6F47" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Card
        sx={{
          borderRadius: 4,
          backgroundColor: "#FFFDF8",
          border: "1px solid #E6D8C3",
          boxShadow: "0 8px 25px rgba(91, 67, 45, 0.10)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          
          {/* Profile Header */}
          <Box sx={{ mb: 4 }}>
            <Avatar
              sx={{
                width: 78,
                height: 78,
                mb: 2,
                backgroundColor: "#D8C3A5",
                color: "#5B4636",
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                color: "#4A3526",
                fontFamily: "Georgia, serif",
              }}
            >
              My Profile
            </Typography>
          </Box>

          {/* Name */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#8B6F47",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Name
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#3F3025",
                fontSize: "1.05rem",
              }}
            >
              {user.name}
            </Typography>
          </Box>

          {/* Email */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#8B6F47",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Email
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#3F3025",
                fontSize: "1.05rem",
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </Typography>
          </Box>

          {/* Logout */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{
              py: 1.3,
              borderRadius: 2,
              backgroundColor: "#8B6F47",
              color: "#FFFDF8",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6F563A",
              },
            }}
          >
            Logout
          </Button>

        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;