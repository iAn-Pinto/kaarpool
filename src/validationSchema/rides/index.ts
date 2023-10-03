import * as yup from 'yup';

export const rideValidationSchema = yup.object().shape({
  start_location: yup.string().required(),
  end_location: yup.string().required(),
  start_time: yup.date().required(),
  end_time: yup.date().nullable(),
  seats_available: yup.number().integer().nullable(),
  car_id: yup.string().nullable().required(),
});
