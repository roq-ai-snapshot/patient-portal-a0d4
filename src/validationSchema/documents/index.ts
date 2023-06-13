import * as yup from 'yup';

export const documentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  file_path: yup.string().required(),
  patient_id: yup.string().nullable(),
  clinic_id: yup.string().nullable(),
});
