import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .label('Email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be atleast 6 characters long')
    .label('Password'),
});

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .label('Email'),
});
