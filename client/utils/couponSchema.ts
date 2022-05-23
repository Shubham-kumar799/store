import * as Yup from 'yup';

export const couponSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .length(8, 'Name should be at 8 characters long')
    .label('Name'),
  discount: Yup.number().required('Discount is required').label('Discount'),
  expiryDate: Yup.date()
    .required('Expiry date is required')
    .label('ExpiryDate'),
});
