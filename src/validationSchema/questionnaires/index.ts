import * as yup from 'yup';
import { patientQuestionnaireValidationSchema } from 'validationSchema/patient-questionnaires';

export const questionnaireValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  clinic_id: yup.string().nullable().required(),
  patient_questionnaire: yup.array().of(patientQuestionnaireValidationSchema),
});
