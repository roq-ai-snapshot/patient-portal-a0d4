import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPatientQuestionnaireById, updatePatientQuestionnaireById } from 'apiSdk/patient-questionnaires';
import { Error } from 'components/error';
import { patientQuestionnaireValidationSchema } from 'validationSchema/patient-questionnaires';
import { PatientQuestionnaireInterface } from 'interfaces/patient-questionnaire';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PatientInterface } from 'interfaces/patient';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { getPatients } from 'apiSdk/patients';
import { getQuestionnaires } from 'apiSdk/questionnaires';

function PatientQuestionnaireEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PatientQuestionnaireInterface>(
    () => (id ? `/patient-questionnaires/${id}` : null),
    () => getPatientQuestionnaireById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PatientQuestionnaireInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePatientQuestionnaireById(id, values);
      mutate(updated);
      resetForm();
      router.push('/patient-questionnaires');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PatientQuestionnaireInterface>({
    initialValues: data,
    validationSchema: patientQuestionnaireValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Patient Questionnaire
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              id="completed"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.completed}
            >
              <FormLabel htmlFor="switch-completed">Completed</FormLabel>
              <Switch
                id="switch-completed"
                name="completed"
                onChange={formik.handleChange}
                value={formik.values?.completed ? 1 : 0}
              />
              {formik.errors?.completed && <FormErrorMessage>{formik.errors?.completed}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PatientInterface>
              formik={formik}
              name={'patient_id'}
              label={'Select Patient'}
              placeholder={'Select Patient'}
              fetcher={getPatients}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<QuestionnaireInterface>
              formik={formik}
              name={'questionnaire_id'}
              label={'Select Questionnaire'}
              placeholder={'Select Questionnaire'}
              fetcher={getQuestionnaires}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'patient_questionnaire',
  operation: AccessOperationEnum.UPDATE,
})(PatientQuestionnaireEditPage);
