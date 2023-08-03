import React from 'react';
import { Card, CardContent, Typography, CardMedia} from '@mui/material';
import complete from '../assets/complete.png'

function PaymentSuccessful() {
   return (
      <div className='s-div'>
         <Card variant="outlined" className='s-payment' sx={{ maxWidth: 500 }}>
            <CardMedia component="img" image={complete} alt="Successful Payment" className='s-media'/>
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  Payment Successful
               </Typography>
            </CardContent>
         </Card>
      </div>
   );
}

export default PaymentSuccessful;