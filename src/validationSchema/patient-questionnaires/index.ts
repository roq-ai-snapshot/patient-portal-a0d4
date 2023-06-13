import * as yup from 'yup';

export const patientQuestionnaireValidationSchema = yup.object().shape({
  completed: yup.boolean().required(),
  patient_id: yup.string().nullable().required(),
  questionnaire_id: yup.string().nullable().required(),
});
