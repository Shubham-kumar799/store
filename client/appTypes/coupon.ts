export interface AddCouponFormValuesType {
  name: string;
  expiryDate: string;
  discount: number;
}

export interface Coupon {
  name: string;
  _id: string;
  expiryDate: string;
  discount: number;
}
