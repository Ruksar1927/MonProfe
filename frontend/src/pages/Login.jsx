import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
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

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 const handleLogin = async () => {
  setLoading(true);

  try {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response.data);
   
     // Save JWT token in browser
  localStorage.setItem("token", response.data.access_token);

   navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert("Invalid Email or Password");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Login to continue
          </Typography>

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
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
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
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</Button>

          <Typography align="center">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;