import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .label('Email'),
  password: Yup.string().required('Password is required').label('Password'),
});
