import { PatientInterface } from 'interfaces/patient';
import { ClinicInterface } from 'interfaces/clinic';
import { GetQueryInterface } from 'interfaces';

export interface DocumentInterface {
  id?: string;
  title: string;
  file_path: string;
  patient_id?: string;
  clinic_id?: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  clinic?: ClinicInterface;
  _count?: {};
}

export interface DocumentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  file_path?: string;
  patient_id?: string;
  clinic_id?: string;
}
