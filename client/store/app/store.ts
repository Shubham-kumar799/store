//utils
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '@store/features/user/userSlice';
import cartReducer from '@store/features/cart/cartSlice';
import couponReducer from '@store/features/coupon/couponSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    coupon: couponReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
