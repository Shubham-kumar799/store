//utils
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/app/store';

//types
import { appUser } from 'appTypes/user';

export interface CounterState {
  user: null | appUser;
}

const initialState: CounterState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    LOGIN: (state, { payload }: PayloadAction<appUser>) => {
      state.user = payload;
    },
    LOGOUT: state => {
      state.user = null;
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
