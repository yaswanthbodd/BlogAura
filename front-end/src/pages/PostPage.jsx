import { Box } from '@mui/material'
import React from 'react'
import { Navbar } from '../components/Navbar'
import Upload from '../components/post/Upload'

const PostPage = () => {
    return (
        <Box>
            <Navbar />
            <Box marginTop={10}>
                <Upload />
            </Box>
            
        </Box>
    )
}

export default PostPage