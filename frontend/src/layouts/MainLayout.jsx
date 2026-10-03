import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import QuizIcon from "@mui/icons-material/Quiz";
import StyleIcon from "@mui/icons-material/Style";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpIcon from "@mui/icons-material/Help";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 250;

function MainLayout() {
  const navigate = useNavigate(), location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Subjects", icon: <SchoolIcon />, path: "/subjects" },
    { text: "PDF Manager", icon: <PictureAsPdfIcon />, path: "/pdf" },
    { text: "AI Assistant", icon: <SmartToyIcon />, path: "/aichat" },
    { text: "Quiz", icon: <QuizIcon />, path: "/quiz" },
    { text: "Flashcards", icon: <StyleIcon />, path: "/flashcards" },
    { text: "Study Planner", icon: <CalendarMonthIcon />, path: "/study-planner" },
    { text: "Expected Questions", icon: <HelpIcon />, path: "/expected-questions" },
    { text: "Weak Topics", icon: <WarningAmberIcon />, path: "/weak-topics" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#F8F1E7", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: "#4A2F1B", color: "#FFF8EF", boxShadow: "0 2px 10px rgba(74,47,27,.18)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Georgia,serif", letterSpacing: ".5px" }}>
            𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆
          </Typography>
          <Button onClick={handleLogout} variant="outlined" sx={{ color: "#FFF8EF", borderColor: "#D8BFA3", borderRadius: 2, "&:hover": { borderColor: "#FFF8EF", bgcolor: "rgba(255,255,255,.08)" } }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", bgcolor: "#F3E5D0", color: "#4A2F1B", borderRight: "1px solid #DEC9AE" } }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Georgia,serif", color: "#4A2F1B" }}>
            𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆
          </Typography>
        </Toolbar>

        <List sx={{ px: 1.5, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: .7, borderRadius: 2, color: "#5A3B23",
                "& .MuiListItemIcon-root": { color: "#795334", minWidth: 42 },
                "&.Mui-selected": { bgcolor: "#6B4528", color: "#FFF8EF" },
                "&.Mui-selected .MuiListItemIcon-root": { color: "#FFF8EF" },
                "&.Mui-selected:hover": { bgcolor: "#6B4528" },
                "&:hover": { bgcolor: "#E7D5BD" }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
  primary={item.text}
  slotProps={{
    primary: {
      sx: { fontWeight: location.pathname === item.path ? 600 : 500 }
    }
  }}
/>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 8, minHeight: "100vh", bgcolor: "#FCF8F2" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;