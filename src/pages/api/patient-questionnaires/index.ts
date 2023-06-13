import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { patientQuestionnaireValidationSchema } from 'validationSchema/patient-questionnaires';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPatientQuestionnaires();
    case 'POST':
      return createPatientQuestionnaire();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPatientQuestionnaires() {
    const data = await prisma.patient_questionnaire
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'patient_questionnaire'));
    return res.status(200).json(data);
  }

  async function createPatientQuestionnaire() {
    await patientQuestionnaireValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.patient_questionnaire.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
