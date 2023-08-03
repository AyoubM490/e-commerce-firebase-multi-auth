import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isCategoriesFetched: false,
  totalCount: 0,
  cartItems: [],
  totalPrice: 0,
  isPaymentSuccessful: false,
};

export const fetchCategories = createAsyncThunk(
  'store/fetchCategories',
  async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())

      return response;
  }
)

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCartItemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );
      
      if(existingCartItemIndex !== -1) {
        state.cartItems[existingCartItemIndex].quantity = state.cartItems[existingCartItemIndex].quantity + 1;
      } else {
        let newCartItem = {
          "id": action.payload.id,
          "data": action.payload,
          "quantity": 1
        }
        state.cartItems.push(newCartItem);
      }
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
    },

    addItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );

      state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity + 1;
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + state.cartItems[itemIndex].data.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
    },

    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );
      
      state.totalPrice = state.totalPrice - state.cartItems[itemIndex].data.price;
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
      if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
      } else {
        state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity - 1;
      }
      state.totalCount = state.totalCount - 1;
    }, 

    clearItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );

      const countToRemove = state.cartItems[itemIndex].quantity;
      state.totalPrice = state.totalPrice - (state.cartItems[itemIndex].quantity)*(state.cartItems[itemIndex].data.price);
      state.totalPrice = Math.round(state.totalPrice * 100) / 100;
      state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
      state.totalCount = state.totalCount - countToRemove;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.isPaymentSuccessful = true
    }
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.isCategoriesFetched = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.isCategoriesFetched = true;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.isCategoriesFetched = false;
    },
  },
})

export const {
  addToCart,
  addItem,
  removeItem,
  clearItem,
  clearCart
} = storeSlice.actions;

export default storeSlice.reducer;