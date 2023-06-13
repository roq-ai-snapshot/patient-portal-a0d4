const mapping: Record<string, string> = {
  clinics: 'clinic',
  documents: 'document',
  patients: 'patient',
  'patient-questionnaires': 'patient_questionnaire',
  questionnaires: 'questionnaire',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
