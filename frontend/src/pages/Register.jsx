import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>

          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Exam Coach AI
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={4}
          >
            Create your account
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          <Typography align="center">
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;