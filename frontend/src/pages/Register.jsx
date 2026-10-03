import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import {
  Button, Card, CardContent, Container, TextField, Typography,
  InputAdornment, IconButton, Box
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
      await api.post("/auth/register", { name, email, password });
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8F1E7", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: 480, mx: "auto", p: 3, borderRadius: 4, bgcolor: "#FFF8EF", boxShadow: "0 8px 30px rgba(74,47,27,0.12)" }}>
          <CardContent>
            <Typography variant="h4" align="center" fontWeight="bold" sx={{ fontFamily: "Georgia, serif", color: "#4A2F1B", mb: 1 }}>
              𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆
            </Typography>
            <Typography align="center" sx={{ color: "#795334", mb: 4 }}>
              Create your account
            </Typography>

            <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password" type={showPassword ? "text" : "password"} fullWidth margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)}
              slotProps={{ input: { endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}}}
            />

            <Button
              variant="contained" fullWidth onClick={handleRegister} disabled={loading}
              sx={{ mt: 3, mb: 2, borderRadius: 2, bgcolor: "#6B4528", "&:hover": { bgcolor: "#4A2F1B" } }}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <Typography align="center" sx={{ color: "#5A3B23" }}>
              Already have an account?{" "}
              <Link to="/" style={{ color: "#6B4528", fontWeight: 600 }}>Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;