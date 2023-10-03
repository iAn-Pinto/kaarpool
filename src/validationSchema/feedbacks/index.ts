import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comments: yup.string().nullable(),
  booking_id: yup.string().nullable().required(),
});
