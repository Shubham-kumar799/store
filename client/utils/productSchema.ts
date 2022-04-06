import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name should be at least 4 characters long')
    .label('Name'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description should be at least 10 characters long')
    .max(2000, 'Description cannot exceed 2000 characters')
    .label('Description'),
  price: Yup.number()
    .required('Price is required')
    .not([0], 'Price cannot be zero')
    .label('Price'),
  quantity: Yup.number().required('Quantity is required').label('Quantity'),
  color: Yup.string().required('Color is required').label('Color'),
  brand: Yup.string().required('Brand is required').label('Brand'),
  category: Yup.string()
    .required('Category is required')
    .label('subCategories'),
  subCategories: Yup.array()
    .min(1, 'Select at least one sub-categories')
    .label('subCategories'),
});
