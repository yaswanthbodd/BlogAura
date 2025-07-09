import { Box, Button, Dialog, DialogTitle, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';


export const DailogBox = React.memo(({open, handleClose}) => {

    //console.log("Register Page")

    const [showPassword, setShowPassword] = useState(false)
    const handleToggolePassword = () => {
        setShowPassword((prev) => !prev);
    }

    // Create Registration Data form
    const [registrationData, setRegistrationData] = useState({
        username:'',
        email:'',
        password:'',
        age:'',
    })
    const [image, setImage] = useState(null);

    //Handle the register Data changes
    const handleChange = (e) => {
        const {name, value} = e.target
        setRegistrationData(prev => ({
            ...prev,
            [name] : value
        }))
    }
    // Handle Image File
    const handleImageFile = (e) => {
        const file = e.target.files[0];
        if(file)
            setImage(file);
    }

    // Handle the submitForm
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageFile",image);
        formData.append("registerData",new Blob([JSON.stringify(registrationData)], {type : 'application/json'}) )
        console.log("Form Data : ",registrationData);
        console.log("Image File", image)
        

        setRegistrationData({
            username : '',
            email : '',
            password : '',
            age : ''
        })
        setImage(null)
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose} >
                <Box width='400px' height='570px' className="border-4 border-b-amber-600 border-t-blue-700 border-l-emerald-600 border-r-purple-600">
                    <Box margin='10px'>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='h5' fontWeight='700'>Register</Typography>
                            <IconButton size='small'>
                                <ClearIcon />
                            </IconButton>
                        </Stack>
                        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3} margin={4}>

                            <TextField required size='small' label='Username' name='username' type='text' onChange={handleChange} value={registrationData.username} />

                            <TextField required size='small' label='Email' name='email' type='email' onChange={handleChange} value={registrationData.email}/>

                            <TextField 
                                    required 
                                    size='small' 
                                    label='Password' 
                                    name='password' 
                                    type={showPassword ? 'text' : 'password'} 
                                    onChange={handleChange} 
                                    value={registrationData.password} 
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

                            <TextField required size='small' label='number' name='age' type='number' onChange={handleChange} value={registrationData.age}/>

                            <Button variant='contained' component='label'>
                                Upload Pic
                                <input hidden accept='image/*' type='file' onChange={handleImageFile}/>
                            </Button>

                            {/* Preview the image */}
                            {
                                image && (
                                    <Box textAlign={'center'}>
                                        <img 
                                            src={URL.createObjectURL(image)}
                                            alt='preview'
                                            style={{maxWidth : '100%' , height:'100px', borderRadius : 8}}
                                        />
                                    </Box>
                                )
                            }

                            <Button type='submit' variant='contained'>Register</Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    )
})
