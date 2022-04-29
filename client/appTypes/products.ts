import { FormikErrors, FormikTouched } from 'formik';
import { Category } from './categories';
import { SubCategory } from './subCategories';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  brand: string;
  sold: number;
  shipping: boolean;
  category: Category;
  subCategories: SubCategory[];
  images: ProductImage[];
}

export interface ProductImage {
  public_id: string;
  url: string;
}

export interface AddProductFormValuesType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  brand: string;
  shipping: boolean;
  category: string;
  subCategories: string[];
}

export interface AddProductFormErrorsAndTouched {
  errors: FormikErrors<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    color: string;
    brand: string;
    shipping: boolean;
    category: string;
    subCategories: string[];
  }>;
  touched: FormikTouched<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    color: string;
    brand: string;
    shipping: boolean;
    category: string;
    subCategories: string[];
  }>;
}

export interface ProductInfoFormValuesType {
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  brand: string;
  shipping: boolean;
}

export interface SelectCategoryFormValuesType {
  category: string;
  subCategories: string[];
}

export interface SelectCategoryFormErrorsAndTouched {
  errors: FormikErrors<{
    category: string;
    subCategories: string[];
  }>;
  touched: FormikTouched<{
    category: string;
    subCategories: string[];
  }>;
}
