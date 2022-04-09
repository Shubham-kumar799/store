import { FormikErrors, FormikTouched } from 'formik';

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

export interface AddProductImageFormValuesType {
  images: string[];
}

export interface AddProductImageFormErrors {
  errors: FormikErrors<{
    images: string[];
  }>;
}

export interface AddProductImageFormTouched {
  errors: FormikTouched<{
    images: string[];
  }>;
}

export interface AddProductFromErrorsAndTouched {
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
