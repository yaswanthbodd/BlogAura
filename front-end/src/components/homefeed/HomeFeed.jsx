import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useEffect, useState } from 'react'
import SkeletionCard from '../SkeletionCard';
import API from '../apiservices/Api';
import moment from 'moment';

const HomeFeed = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchPosts = async ()=> {
            try{
                const res = await API.get('/api/posts/all');
                console.log(res.data)
                setPosts(res.data);
            }catch(err){
                console.error("Error fetching posts ",err);
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    },[])

    //Image Modification
    const imageSrc = (base64, type) => {
        return base64 ? `data:${type};base64,${base64}` : '';
    }

    //Like Button Handler
    const handleLike = async(postId) => {
        try{
            await API.post(`/api/posts/${postId}/like`);
            setPosts(prevPosts => prevPosts.map(post => 
                post.postId === postId ? {...post, likeCount : post.likeCount + 1} : post
            ))
        }catch(err){
            console.error("Error liking post : ",err)
        }
    }

    //Dislike button handler
    const handleDislike = async (postId) => {
        try{
            await API.post(`/api/posts/${postId}/dislike`);
            setPosts(
                prevPosts => prevPosts.map(post => 
                    post.postId === postId ? {...post, dislikeCount : post.dislikeCount + 1} : post
                )
            )
        }catch(err){
            console.error("Error Dislike post : ",err)
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {
                loading ? Array.from({length : 3}).map((_,idx) => <SkeletionCard key={idx} />) :
                posts.map((post, idx) => (
                    <Card key={idx} sx={{ width: '500px' }} data-aos="fade-up">
                        <CardHeader
                            avatar={
                                <Avatar src={imageSrc(post.userImageBase64, post.userImageType)} sx={{ bgcolor: red[500] }}>
                                    {post.userName?.charAt(0)}
                                </Avatar>
                            }
                            action={<IconButton><MoreVertIcon /></IconButton>}
                            title={post.userName}
                            subheader={`${moment(post.postTime).format('DD-MM-YYYY')} . ${moment(post.postTime).fromNow()}`}
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
                            <IconButton aria-label="like" onClick={()=> handleLike(post.postId)}>
                                <FavoriteIcon />
                                <Typography variant="body2" ml={0.5}>{post.likeCount}</Typography>
                            </IconButton>
                            <IconButton aria-label="dislike" onClick={()=> handleDislike(post.postId)}>
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