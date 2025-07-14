import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useLoading } from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import API from '../apiservices/Api'

const Upload = () => {
    const { userData } = useContext(AppContext);
    const {spinnerLoading, setSpinnerLoading} = useLoading();
    const navigate = useNavigate();

    // upload Data 
    const [uploadData, setUploadData] = useState({
        title : '',
        description : '',
    })
    const [postImage, setPostImage] = useState(null);

    //Handle Upload Change
    const handleUploadChange = (e)=>{
        const {name, value} = e.target
        setUploadData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleImageFile = (e)=>{
        const file = e.target.files[0];
        if(file)
            setPostImage(file);
    }

    // Handle Submit
    const handleSubmit =async (e)=>{
        e.preventDefault();
        setSpinnerLoading(true);
        const formData = new FormData();
        formData.append("image",postImage);
        formData.append("uploadData", new Blob([JSON.stringify(uploadData)], {type : 'application/json'}))
        console.log("Upload Data : ",uploadData)
        console.log("image : ",postImage);

        try {
            const res = await API.post("/api/posts/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
        });

            console.log(res.data);
            alert("Post created successfully!");
            setUploadData({
                title : '',
                description : '',
            })
            setPostImage(null);
            navigate("/")
        } catch (error) {
            console.error("Error uploading post:", error);
            alert("Failed to upload post");
        }
        finally{
            setSpinnerLoading(false);
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Paper
                elevation={3}
                sx={{
                    height: postImage ? "630px" : "400px",
                    width: "400px",
                    border: '1px solid red',
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} gap={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                                src={`data:image/jpeg;base64,${userData?.user?.image}`}
                                sx={{ width: 48, height: 48, objectFit: 'contain', bgcolor: 'red' }}
                            >
                                {userData?.user?.name?.charAt(0) ?? userData?.user?.userName}
                            </Avatar>
                            <Typography variant="subtitle2" sx={{ color: 'GrayText' }}>
                                @{userData?.user?.userName}
                            </Typography>
                        </Box>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>

                    <TextField size='small' type='text' label='Enter the title' name='title' onChange={handleUploadChange} value={uploadData.title} disabled={spinnerLoading}/>
                    <TextField maxRows={5} multiline minRows={4}  type='text' label='Enter the Description' name='description' onChange={handleUploadChange} value={uploadData.description} disabled={spinnerLoading}/>
                    
                    <Button variant='contained' component='label'>
                                Upload Pic
                                <input hidden accept='image/*' type='file' onChange={handleImageFile} disabled={spinnerLoading}/>
                    </Button>
                    {
                        postImage && (
                            <Box textAlign={'center'}>
                                <img 
                                    src={URL.createObjectURL(postImage)}
                                    alt='preview'
                                    style={{maxWidth : '100%' , height:'200px', borderRadius : 8}}
                                />
                            </Box>
                        )
                    }
                    <Button type='submit' variant='contained'>Register</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default React.memo(Upload);
