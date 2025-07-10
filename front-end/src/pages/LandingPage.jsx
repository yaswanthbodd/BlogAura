import {Box, Typography, CircularProgress} from '@mui/material'
import { Navbar } from '../components/Navbar'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const LandingPage = () => {

    const { loading } = useContext(AppContext);

    // FIXED: Better loading UI
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
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Navbar />
            {/* Your landing page content */}
        </Box>
    )
}