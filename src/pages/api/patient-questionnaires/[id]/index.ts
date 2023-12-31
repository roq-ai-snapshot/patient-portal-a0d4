import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { patientQuestionnaireValidationSchema } from 'validationSchema/patient-questionnaires';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.patient_questionnaire
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPatientQuestionnaireById();
    case 'PUT':
      return updatePatientQuestionnaireById();
    case 'DELETE':
      return deletePatientQuestionnaireById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPatientQuestionnaireById() {
    const data = await prisma.patient_questionnaire.findFirst(
      convertQueryToPrismaUtil(req.query, 'patient_questionnaire'),
    );
    return res.status(200).json(data);
  }

  async function updatePatientQuestionnaireById() {
    await patientQuestionnaireValidationSchema.validate(req.body);
    const data = await prisma.patient_questionnaire.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePatientQuestionnaireById() {
    const data = await prisma.patient_questionnaire.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
