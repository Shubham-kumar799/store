import { CartProduct } from './cart';

enum OrderStatus {
  Not_Processed = 'Not_Processed',
  Fulfilled = 'Fulfilled',
  Processing = 'Processing',
  Out_For_Delivery = 'Out_For_Delivery',
  Cancelled = 'Cancelled',
}

export interface MyOrder {
  _id: string;
  orderedBy: string;
  createdAt: string;
  updatedAt: string;
  products: [
    {
      product: CartProduct;
      count: number;
    }
  ];
  orderStatus: OrderStatus;
  paymentIntent: PaymentIntent;
}

interface PaymentIntent {
  id: string;
  object: string;
  amount: number;
  capture_method: string;
  client_secret: string;
  currency: string;
  livemode: Boolean;
  payment_method: string;
  status: string;
  payment_method_types: [string];
}
