import { Box, Button, Dialog, DialogTitle, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import API from './apiservices/Api'

export const LoginBox = React.memo(
    ({open, handleClose}) => {
    
    //Context
    const {setIsAuthenticated} = useContext(AppContext);
    const navigate = useNavigate();
    const {spinnerLoading, setSpinnerLoading} = useLoading();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false)
    const handleToggolePassword = () => {
        setShowPassword((prev) => !prev);
    }

    // Create Login Data form
    const [loginData, setLoginData] = useState({
        userName:'',
        password:'',
    })

    //Handle the register Data changes
    const handleChange = (e) => {
        const {name, value} = e.target
        setLoginData(prev => ({
            ...prev,
            [name] : value
        }))
        // Clear error when user starts typing
        setErrorMessage('');
    }
    
    // Handle the submitForm with proper cookie handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSpinnerLoading(true);
        try {
            console.log("Attempting login...");
            
            // Send login request with credentials
            const response = await API.post("/login", loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Login successful:", response.data);
            
            // Set authentication state
            setIsAuthenticated(true);
            
            // Clear form
            setLoginData({
                userName : '',
                password : '',
            });
            
            // Show success message
            setOpenSnackbar(true);
            
            // Close dialog after delay
            setTimeout(() => {
                handleClose();
            }, 1000);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            
            // Handle different error response formats
            let errorMsg = "Login failed. Please try again.";
            
            if (error.response) {
                // Server responded with error status
                if (error.response.data) {
                    if (typeof error.response.data === 'string') {
                        errorMsg = error.response.data;
                    } else if (error.response.data.message) {
                        errorMsg = error.response.data.message;
                    }
                }
            } else if (error.request) {
                // Request was made but no response received
                errorMsg = "Unable to connect to server. Please check your connection.";
            }
            
            setErrorMessage(errorMsg);
        }
        finally{
            setSpinnerLoading(false);
        }
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose} >
                <Box width='400px' height='350px' className="border-4 border-b-amber-600 border-t-blue-700 border-l-emerald-600 border-r-purple-600">
                    <Box margin='10px'>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5' fontWeight='700'>Login</Typography>
                            <IconButton size='small' onClick={handleClose}>
                                <ClearIcon />
                            </IconButton>
                        </Stack>
                        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3} margin={4}>

                            {/* Error message display */}
                            {errorMessage && (
                                <Typography variant='body2' color='error' sx={{ mb: 1 }}>
                                    {errorMessage}
                                </Typography>
                            )}

                            <TextField required size='small' label='Username' name='userName' type='text' onChange={handleChange} value={loginData.userName} disabled={spinnerLoading}/>

                            <TextField 
                                    required 
                                    size='small' 
                                    label='Password' 
                                    name='password' 
                                    type={showPassword ? 'text' : 'password'} 
                                    onChange={handleChange} 
                                    value={loginData.password} 
                                    InputProps={{
                                        endAdornment : (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleToggolePassword} edge='end'>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    disabled={spinnerLoading}
                            />
                            <Button type='submit' variant='contained' color='success'>Login</Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                <MuiAlert onClose={() => setOpenSnackbar(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Login Successfully
                </MuiAlert>
            </Snackbar>
        </Box>
    )
})