import React from 'react';
import { Card, CardMedia, CardActions, CardContent, Button, Typography} from '@mui/material';
import empty from '../assets/empty.png'
import { Link } from 'react-router-dom';

function EmptyCart() {
   return (
      <div className='empty-cart-div'>
         <Card sx={{ maxWidth: 500 }} className='empty-cart'>
            <CardMedia component="img" image={empty} alt="Empty Cart" className='empty-cart-media'/>
            <CardContent>
               <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Cart is empty
               </Typography>
            </CardContent>
            <CardActions>
               <Link to="/shop" className='empty-cart-button'>
                  <Button variant="contained">
                      Continue Shopping
                  </Button>
               </Link>
            </CardActions>
         </Card>
      </div>
   );
}

export default EmptyCart;