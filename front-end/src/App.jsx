import { useContext } from "react";
import { LandingPage } from "./pages/LandingPage"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AppContext } from "./context/AppContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import PostPage from "./pages/PostPage";
import GlobalSpinner from "./components/spinner/GlobalSpinner";

function App() {
  const { loading,isAuthenticated } = useContext(AppContext);
  
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
        <GlobalSpinner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post" element={isAuthenticated ? <PostPage /> : <Navigate to="/" replace/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App