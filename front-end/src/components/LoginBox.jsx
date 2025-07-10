import { Box, Button, Dialog, DialogTitle, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import MuiAlert from '@mui/material/Alert';


export const LoginBox = React.memo(
    ({open, handleClose}) => {
    
    //Context
    const {bearerToken,setBearerToken} = useContext(AppContext);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    //console.log('Login Box');

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
    }
    
    // Handle the submitForm
    const handleSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("loginData",new Blob([JSON.stringify(loginData)], {type : 'application/json'}) )
        //console.log("Login Data : ",formData);
        //console.log("login data",loginData)

        axios.post("http://localhost:8080/login",loginData)
        .then((response)=>{
            setBearerToken(response.data);
            //console.log("Bearer Token : ",response.data);
            setLoginData({
                userName : '',
                password : '',
            })
            setOpenSnackbar(true);
            setTimeout(() => {
                handleClose();
            }, 1000);
        })
        .catch((error)=>{
            console.log("Something Wrong")
        })

        
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose} >
                <Box width='400px' height='300px' className="border-4 border-b-amber-600 border-t-blue-700 border-l-emerald-600 border-r-purple-600">
                    <Box margin='10px'>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5' fontWeight='700'>Login</Typography>
                            <IconButton size='small'>
                                <ClearIcon />
                            </IconButton>
                        </Stack>
                        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3} margin={4}>

                            <TextField required size='small' label='Username' name='userName' type='text' onChange={handleChange} value={loginData.userName} />

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
                            />
                            <Button type='submit' variant='contained' color='success'>Login</Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                <MuiAlert onClose={() => setOpenSnackbar(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Login Successfully
                </MuiAlert>
            </Snackbar>
        </Box>
    )
}
)
