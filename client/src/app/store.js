import { configureStore } from '@reduxjs/toolkit';
import storeReducer from '../components/storeSlice'

export const store = configureStore({
   reducer: {
      store: storeReducer
   },
});