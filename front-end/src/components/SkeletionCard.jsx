import { Card, CardActions, CardContent, CardHeader, Skeleton } from '@mui/material'
import React from 'react'

const SkeletionCard = () => {
    return (
        <Card sx={{width : '500px'}}>
            <CardHeader 
                avatar={<Skeleton variant='circular' width={40} height={40} />}
                title={<Skeleton width="80%" />}
                subheader={<Skeleton width="40%" />}
            />
            <Skeleton variant='rectangular' height={194}/>
            <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="90%" />
            </CardContent>
            <CardActions>
                <Skeleton variant='circular' width={30} height={30}/>
                <Skeleton variant='circular' width={30} height={30} />
            </CardActions>
        </Card>
    );
};

export default SkeletionCard