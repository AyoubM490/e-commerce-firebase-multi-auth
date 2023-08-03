import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Stripe API integration
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const container = document.getElementById('root');
const root = createRoot(container);

const stripePromise = loadStripe('pk_test_51NayFdFxYp9KvlJfobTPbqRpOoqYFCG6KdeuuBbALsKpsgNzva5lYs3CnkFOkvchLXKFlMg2RzDhAtZwTw3kjKMp00mPkrt9pd');

root.render(
   <Provider store={store}>
      <Elements stripe={stripePromise}>
         <App />
      </Elements>
   </Provider>
);

reportWebVitals();