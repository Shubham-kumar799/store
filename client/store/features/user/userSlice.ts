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
    LOGIN: (state, { payload }: PayloadAction<appUser>) => {
      state.user = payload;
    },
    LOGOUT: state => {
      state.user = nullUser;
    },
  },
});

export const { LOGIN, LOGOUT, INCREMENT_USER_CART_COUNT } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
