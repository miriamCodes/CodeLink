import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
async function updateProfile(req: Request, res: Response) {
  const { id, bio } = req.body;
  await prisma.profile.update({
    where: { id },
    data: {
      bio
    }
  });
  res.status(200).send({key:'PROFILE CORRECTLY UPDATED'});
}

export { updateProfile };