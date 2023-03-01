import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helpers/axios';

export interface ItemCardProps {
    id: number;
    name: string;
    description: string;
    image: string;
    endOfAuction: Date;
    current_bid: number;
    buttonAction?: () => void;
}

export const ItemCard = ({ id, name, description, current_bid, endOfAuction, image, buttonAction }: ItemCardProps) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ width: "400px", height: "500px", flex: "0 1 400px", cursor: "default", borderRadius: "10%" }}>
            <CardMedia
                component="img"
                height="50%"
                image={BASE_URL + image}
                alt="green iguana"
            />
            <CardContent  >
                <Typography gutterBottom variant="h4" component="div" >
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <h4 >Current Bid: {current_bid}$</h4>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                }}>
                    <strong>Description:</strong>  {description}
                </Typography>
                <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
                    <Button variant="contained" onClick={() => navigate(`items/${id}`)}>Bid Now</Button>
                </Container>
            </CardContent>
        </Card>
    )
}