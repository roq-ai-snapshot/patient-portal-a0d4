import axios from 'axios';
import queryString from 'query-string';
import { PatientQuestionnaireInterface, PatientQuestionnaireGetQueryInterface } from 'interfaces/patient-questionnaire';
import { GetQueryInterface } from '../../interfaces';

export const getPatientQuestionnaires = async (query?: PatientQuestionnaireGetQueryInterface) => {
  const response = await axios.get(`/api/patient-questionnaires${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPatientQuestionnaire = async (patientQuestionnaire: PatientQuestionnaireInterface) => {
  const response = await axios.post('/api/patient-questionnaires', patientQuestionnaire);
  return response.data;
};

export const updatePatientQuestionnaireById = async (
  id: string,
  patientQuestionnaire: PatientQuestionnaireInterface,
) => {
  const response = await axios.put(`/api/patient-questionnaires/${id}`, patientQuestionnaire);
  return response.data;
};

export const getPatientQuestionnaireById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/patient-questionnaires/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deletePatientQuestionnaireById = async (id: string) => {
  const response = await axios.delete(`/api/patient-questionnaires/${id}`);
  return response.data;
};
