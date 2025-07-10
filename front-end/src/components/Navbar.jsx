import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { DailogBox } from './DailogBox';
import { LoginBox } from './LoginBox';
import { useState, useCallback, useMemo, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Navbar = () => {

    const {bearerToken} = useContext(AppContext);

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
            <Stack direction="row" spacing={2}>
                <Button color="inherit">Home</Button>
                {
                    !bearerToken ? (
                                    <>
                                        <Button color="inherit" onClick={handleDialogOpen}>Register</Button>
                                        <Button color="inherit" onClick={handleLoginDialogOpen}>Login</Button>
                                    </>
                                    ) 
                                : (
                                    <>
                                        <Button color="inherit">Logout</Button>
                                    </>
                                    )
                }
                {/* <Button color="inherit" onClick={handleDialogOpen}>Register</Button>
                <Button color="inherit" onClick={handleLoginDialogOpen}>Login</Button> */}
                <Button color="inherit">Create Post</Button>
            </Stack>
            </Toolbar>
        </AppBar>

        {/* Render dialogs */}
        {registerDialog}
        {loginDialog}
        </Box>
    );
};
