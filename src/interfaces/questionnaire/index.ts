import { PatientQuestionnaireInterface } from 'interfaces/patient-questionnaire';
import { ClinicInterface } from 'interfaces/clinic';
import { GetQueryInterface } from 'interfaces';

export interface QuestionnaireInterface {
  id?: string;
  title: string;
  description?: string;
  clinic_id: string;
  created_at?: any;
  updated_at?: any;
  patient_questionnaire?: PatientQuestionnaireInterface[];
  clinic?: ClinicInterface;
  _count?: {
    patient_questionnaire?: number;
  };
}

export interface QuestionnaireGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  clinic_id?: string;
}
