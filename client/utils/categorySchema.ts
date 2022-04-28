import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(1, 'Name should be at least 1 characters long')
    .label('Name'),
});
