import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useEffect, useState } from 'react'
import API from '../apiservices/Api';

const HomeFeed = () => {

    const [posts, setPosts] = useState([]);
    
    useEffect(()=>{
        const fetchPosts = async ()=> {
            try{
                const res = await API.get('/api/posts/all');
                console.log(res.data)
                setPosts(res.data);
            }catch(err){
                console.error("Error fetching posts ",err);
            }
        };
        fetchPosts();
    },[])

    //Image Modification
    const imageSrc = (base64, type) => {
        return base64 ? `data:${type};base64,${base64}` : '';
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {posts.map((post, idx) => (
                <Card key={idx} sx={{ width: '400px' }}>
                    <CardHeader
                        avatar={
                            <Avatar src={imageSrc(post.userImageBase64, post.userImageType)} sx={{ bgcolor: red[500] }}>
                                {post.userName?.charAt(0)}
                            </Avatar>
                        }
                        action={<IconButton><MoreVertIcon /></IconButton>}
                        title={post.userName}
                        subheader={new Date(post.postTime).toLocaleString()}
                    />
                    {post.postImageBase64 &&
                        <CardMedia
                            component="img"
                            height="194"
                            image={imageSrc(post.postImageBase64, post.postImageType)}
                            alt="Post"
                        />}
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="like">
                            <FavoriteIcon />
                            <Typography variant="body2" ml={0.5}>{post.likeCount}</Typography>
                        </IconButton>
                        <IconButton aria-label="dislike">
                            <ThumbDownIcon />
                            <Typography variant="body2" ml={0.5}>{post.dislikeCount}</Typography>
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}

export default HomeFeed