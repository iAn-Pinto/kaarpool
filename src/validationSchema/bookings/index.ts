import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  seat_count: yup.number().integer().nullable(),
  status: yup.string().required(),
  ride_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
