import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography, CircularProgress, Avatar } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { DailogBox } from './DailogBox';
import { LoginBox } from './LoginBox';
import { useState, useCallback, useMemo, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const {isAuthenticated, setIsAuthenticated, loading, userData} = useContext(AppContext);
    const navigate = useNavigate();

    // Registration
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = useCallback(() => setDialogOpen(true), []);
    const handleDialogClose = useCallback(() => setDialogOpen(false), []);

    // Login
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const handleLoginDialogOpen = useCallback(() => setLoginDialogOpen(true), []);
    const handleLoginDialogClose = useCallback(() => setLoginDialogOpen(false), []);

    
    const registerDialog = useMemo(
        () => <DailogBox open={dialogOpen} handleClose={handleDialogClose} />,
        [dialogOpen, handleDialogClose]
    );

    const loginDialog = useMemo(
        () => <LoginBox open={loginDialogOpen} handleClose={handleLoginDialogClose} />,
        [loginDialogOpen, handleLoginDialogClose]
    );

    //Handle the createpost
    const handlePost = useCallback(() => {
        if (isAuthenticated) {
            navigate("/post");
        } else {
            alert("Login the Profile");
        }
    }, [isAuthenticated, navigate]);

    // Enhanced logout handling
    const handleLogout = async () => {
        try {
            console.log("Attempting logout...");
            
            // Send logout request to server
            const response = await axios.post("http://localhost:8080/logout", {}, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("Logout successful:", response.data);
            
            // Clear authentication state
            setIsAuthenticated(false);
            
        } catch (err) {
            console.error("Logout failed:", err);
            
            // Even if logout fails on server, clear client state
            // This ensures user can't get stuck in authenticated state
            setIsAuthenticated(false);
        }
    };  

    // Show loading state in navbar
    if (loading) {
        return (
            <Box>
                <AppBar sx={{ bgcolor: 'green' }}>
                    <Toolbar>
                        <IconButton size="large" aria-label="logo" edge="start" color="inherit">
                            <AcUnitIcon fontSize="large" color="error" />
                        </IconButton>
                        <Typography variant="h5" sx={{ flexGrow: 1 }}>
                            Blog Aura
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <CircularProgress color="inherit" size={20} />
                            <Typography variant="body2">Loading...</Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

    
    //console.log("User Data : ",userData.user.image)
    return (
        <Box>
        <AppBar sx={{ bgcolor: 'green' }} position='fixed'>
            <Toolbar>
            <IconButton size="large" aria-label="logo" edge="start" color="inherit">
                <AcUnitIcon fontSize="large" color="error" />
            </IconButton>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Blog Aura
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button color="inherit" onClick={()=>(navigate('/'))}>Home</Button>
                <Button color="inherit" onClick={handlePost}>Create Post</Button>
                {
                    isAuthenticated ? (
                        // <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        <Avatar
                            src={`data:image/jpeg;base64,${userData?.user?.image}`}
                            sx={{ width: 48, height: 48, objectFit: 'contain', bgcolor: 'red' }}
                            >
                            {userData?.user?.name?.charAt(0) ?? userData?.user?.userName}
                        </Avatar>
                    ) : (
                        <>
                        <Button color="inherit" onClick={handleDialogOpen}>Register</Button>
                        <Button color="inherit" onClick={handleLoginDialogOpen}>Login</Button>
                        </>
                    )
                }
                
            </Stack>
            </Toolbar>
        </AppBar>

        {/* Render dialogs */}
        {registerDialog}
        {loginDialog}
        </Box>
    );
};