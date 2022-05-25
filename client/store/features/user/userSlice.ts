//utils
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/app/store';

//types
import { appUser } from 'appTypes/user';

const nullUser = {
  _id: '',
  cartCount: 0,
  email: '',
  emailVerified: false,
  role: '',
  token: '',
  address: '',
};

export interface UserState {
  user: appUser;
}

const initialState: UserState = {
  user: nullUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    INCREMENT_USER_CART_COUNT: state => {
      state.user.cartCount = state.user.cartCount + 1;
    },
    DECREMENT_USER_CART_COUNT: state => {
      state.user.cartCount = state.user.cartCount - 1;
    },
    SET_USER_CART_COUNT: (state, { payload }) => {
      state.user.cartCount = payload;
    },
    SET_USER_ADDRESS: (state, { payload }) => {
      state.user.address = payload;
    },
    LOGIN: (state, { payload }: PayloadAction<appUser>) => {
      state.user = payload;
    },
    LOGOUT: state => {
      state.user = nullUser;
    },
  },
});

export const {
  LOGIN,
  LOGOUT,
  INCREMENT_USER_CART_COUNT,
  DECREMENT_USER_CART_COUNT,
  SET_USER_ADDRESS,
  SET_USER_CART_COUNT,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
