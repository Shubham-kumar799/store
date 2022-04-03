import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name should be at least 4 characters long')
    .label('Name'),
});
