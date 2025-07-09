import { Box, Button, Dialog, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';


export const LoginBox = React.memo(
    ({open, handleClose}) => {

    //console.log('Login Box');

    const [showPassword, setShowPassword] = useState(false)
    const handleToggolePassword = () => {
        setShowPassword((prev) => !prev);
    }

    // Create Login Data form
    const [loginData, setLoginData] = useState({
        username:'',
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
        const formData = new FormData();
        formData.append("login Data",new Blob([JSON.stringify(loginData)], {type : 'application/json'}) )
        //console.log("Login Data : ",formData);

        setLoginData({
            username : '',
            password : '',
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

                            <TextField required size='small' label='Username' name='username' type='text' onChange={handleChange} value={loginData.username} />

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
        </Box>
    )
}
)
