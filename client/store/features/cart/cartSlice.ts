//utils
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/app/store';
import { start } from 'repl';

export interface CartState {
  cart: string[];
  total: number;
}

const initialState: CartState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    SETCART: (state, { payload }) => {
      state.cart = payload;
    },
    SET_TOTAL: (state, { payload }) => {
      state.total = payload;
    },
    ADD_TO_CART: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    REMOVE_FROM_CART: (state, { payload }) => {
      state.cart = state.cart.filter(i => i !== payload);
    },
  },
});

export const { SET_TOTAL, SETCART, ADD_TO_CART, REMOVE_FROM_CART } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
