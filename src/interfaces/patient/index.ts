import { DocumentInterface } from 'interfaces/document';
import { PatientQuestionnaireInterface } from 'interfaces/patient-questionnaire';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  document?: DocumentInterface[];
  patient_questionnaire?: PatientQuestionnaireInterface[];
  user?: UserInterface;
  _count?: {
    document?: number;
    patient_questionnaire?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  user_id?: string;
}
