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
    currentPrice: number;
    buttonAction?: () => void;
}

export const ItemCard = ({ id, name, description, currentPrice, endOfAuction, image, buttonAction }: ItemCardProps) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ width: "300px", height: "300px", flex: "0 0 300px", cursor: "default" }}>
            <CardMedia
                component="img"
                height="140"
                image={BASE_URL + image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                }}>
                    {description}
                </Typography>
                <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
                    <Button variant="contained" onClick={() => navigate(`items/${id}`)}>Bid Now</Button>
                </Container>
            </CardContent>
        </Card>
    )
}