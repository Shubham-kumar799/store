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
