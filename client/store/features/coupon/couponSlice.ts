//utils
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/app/store';

export interface CouponState {
  couponInfo: {
    couponApplied: boolean;
    discountedPrice: number;
    originalPrice: number;
    couponName: string;
  };
}

const initialState: CouponState = {
  couponInfo: {
    couponApplied: false,
    couponName: '',
    discountedPrice: 0,
    originalPrice: 0,
  },
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,

  reducers: {
    SET_COUPON: (state, { payload }) => {
      state.couponInfo.couponApplied = payload.couponApplied;
      state.couponInfo.couponName = payload.couponName;
      state.couponInfo.discountedPrice = payload.discountedPrice;
      state.couponInfo.originalPrice = payload.originalPrice;
    },
  },
});

export const { SET_COUPON } = couponSlice.actions;

export const selectCouponInfo = (state: RootState) => state.coupon.couponInfo;

export default couponSlice.reducer;
