import { useContext } from "react";
import { LandingPage } from "./pages/LandingPage"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AppContext } from "./context/AppContext";
import { Box, CircularProgress, Typography } from "@mui/material";

function App() {
  const { loading } = useContext(AppContext);
  
  // FIXED: Better loading UI for App component
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="h6">Welcome to Blog Aura</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App