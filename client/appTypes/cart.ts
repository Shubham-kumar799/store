import { ProductImage } from './products';

export interface CartProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  brand: string;
  shipping: boolean;
  images: ProductImage[];
}
