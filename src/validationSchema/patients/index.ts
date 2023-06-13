import * as yup from 'yup';
import { documentValidationSchema } from 'validationSchema/documents';
import { patientQuestionnaireValidationSchema } from 'validationSchema/patient-questionnaires';

export const patientValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  user_id: yup.string().nullable().required(),
  document: yup.array().of(documentValidationSchema),
  patient_questionnaire: yup.array().of(patientQuestionnaireValidationSchema),
});
