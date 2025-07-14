import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography, CircularProgress, Avatar } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { DailogBox } from './DailogBox';
import { LoginBox } from './LoginBox';
import { useState, useCallback, useMemo, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { ColorModeContext } from '../context/ThemeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import API from './apiservices/Api'

export const Navbar = () => {

    const {isAuthenticated, setIsAuthenticated, loading, userData} = useContext(AppContext);
    const navigate = useNavigate();
    const {spinnerLoading, setSpinnerLoading} = useLoading();
    const {toggleColorMode, mode} = useContext(ColorModeContext);

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
            setSpinnerLoading(true)
            // Send logout request to server
            const response = await API.post("/logout-simple", {}, { 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("Logout successful:", response.data);
            
            // Clear authentication state
            setIsAuthenticated(false);
            navigate("/")
        } catch (err) {
            console.error("Logout failed:", err);
            
            // Even if logout fails on server, clear client state
            // This ensures user can't get stuck in authenticated state
            setIsAuthenticated(false);
        }finally{
            setSpinnerLoading(false);
        }
    };  

    // Show loading state in navbar

    //console.log("User Data : ",userData.user.image)
    return (
        <Box>
        <AppBar sx={{ bgcolor: 'green' }} position='fixed' data-aos="fade-down"
     data-aos-duration="1500">
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
                        <>
                        <Avatar
                            src={`data:image/jpeg;base64,${userData?.user?.image}`}
                            sx={{ width: 48, height: 48, objectFit: 'contain', bgcolor: 'red' }}
                            >
                            {userData?.user?.name?.charAt(0) ?? userData?.user?.userName}
                        </Avatar>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                        <Button color="inherit" onClick={handleDialogOpen}>Register</Button>
                        <Button color="inherit" onClick={handleLoginDialogOpen}>Login</Button>
                        </>
                    )
                }
                <IconButton color="inherit" onClick={toggleColorMode}>
                    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Stack>
            </Toolbar>
        </AppBar>

        {/* Render dialogs */}
        {registerDialog}
        {loginDialog}
        </Box>
    );
};