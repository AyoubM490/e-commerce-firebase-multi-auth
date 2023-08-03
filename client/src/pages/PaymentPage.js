import React, {useState} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../components/storeSlice';
import PaymentSuccessful from '../components/PaymentSuccessful';
import EmptyCart from '../components/EmptyCart';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

//Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpr3EX1Va3G80A-up7mXAwsS4hgHvGvYY",
  authDomain: "educative-bc220.firebaseapp.com",
  projectId: "educative-bc220",
  storageBucket: "educative-bc220.appspot.com",
  messagingSenderId: "660800004700",
  appId: "1:660800004700:web:8bdb2b33cba750181a3c99",
  measurementId: "G-GK76DNECW3"
};
//Initialize Database
const db = getFirestore();


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#495057",
      fontFamily: "inherit",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6c757d",
      },
    },
    invalid: {
      color: "#dc3545",
      iconColor: "#dc3545",
    },
  },
};

function PaymentPage(user) {
  const { totalPrice, cartItems, isPaymentSuccessful } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error && totalPrice !== 0) {
      try {
        const {id} = paymentMethod;
        const response = await axios.post(`/payment`, {
          amount: Math.round(totalPrice * 100),
          id
        })

        if (response.data.success) {
          console.log("Successful Payment")
          const docRef = addDoc(collection(db, "orders"), {
              amount: totalPrice,
              cart: cartItems,
              datePlaced: Date().toLocaleString(),
              orderedBy: user
          });
          dispatch(clearCart())
          setSuccess(true)
        }

      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <div>
      {
        !isPaymentSuccessful && cartItems.length === 0 ? 
        <EmptyCart /> 
        :
          !success ?
          <div className='payment-div'>
            <Card 
              sx={{ maxWidth: 500 }} 
              className='payment-card'
            >
              <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                  Complete Payment
                </Typography>
                <br />
                <CardElement options={CARD_ELEMENT_OPTIONS}/>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  className='pay-button' 
                  onClick={(e) => handleSubmit(e)}
                >
                  Pay
                </Button>
              </CardActions>
            </Card>
            <div className='pay-credentials'>
              <Typography>
                <span className='card-number'>*Test card number: </span>  4242 4242 4242 4242 
              </Typography>
              <Typography>
                *The other card details (expiry date, CVC, and ZIP) can be random.
              </Typography>
            </div>
          </div> 
          : 
          <PaymentSuccessful />
      }
    </div>
  );
}

export default PaymentPage;