import * as yup from 'yup';
import { documentValidationSchema } from 'validationSchema/documents';
import { questionnaireValidationSchema } from 'validationSchema/questionnaires';

export const clinicValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  document: yup.array().of(documentValidationSchema),
  questionnaire: yup.array().of(questionnaireValidationSchema),
});
