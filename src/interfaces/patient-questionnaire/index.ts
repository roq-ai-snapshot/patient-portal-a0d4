import { PatientInterface } from 'interfaces/patient';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { GetQueryInterface } from 'interfaces';

export interface PatientQuestionnaireInterface {
  id?: string;
  patient_id: string;
  questionnaire_id: string;
  completed?: boolean;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  questionnaire?: QuestionnaireInterface;
  _count?: {};
}

export interface PatientQuestionnaireGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  questionnaire_id?: string;
}
