import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Container, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = useState(false), [email, setEmail] = useState(""), [password, setPassword] = useState(""), [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email); formData.append("password", password);
      const response = await api.post("/auth/login", formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error); alert("Invalid Email or Password");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F8F1E7" }}>
      <Card sx={{ width: "100%", p: 3, borderRadius: 3, bgcolor: "#FCF8F2", border: "1px solid #DEC9AE", boxShadow: "0 8px 25px rgba(74,47,27,0.12)" }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold" sx={{ fontFamily: "Georgia, serif", color: "#4A2F1B" }}>𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆</Typography>
          <Typography align="center" color="#795334" mb={4}>Your personal AI learning assistant</Typography>

          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type={showPassword ? "text" : "password"} fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#795334" }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> } }}
          />

          <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2, borderRadius: 2, bgcolor: "#4A2F1B", "&:hover": { bgcolor: "#6B4528" } }} onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography align="center" color="#5A3B23">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#795334", fontWeight: 600 }}>Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;