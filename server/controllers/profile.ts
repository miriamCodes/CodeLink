import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { updateUser } from './user';

const prisma = new PrismaClient();

async function updateProfile(req: Request, res: Response) {
  const id = +req.params.id;
  const { firstName, lastName, bio } = req.body;
  await prisma.profile.update({
    where: { id },
    data: {
      bio,
    }
  });
  updateUser(firstName, lastName, id);
  res.status(200).send({ key: 'PROFILE CORRECTLY UPDATED' });
}

async function getProfile(req: Request, res: Response) {
  const id = +req.params.id;
  const profile = await prisma.profile.findUnique({
    where: {
      id
    },
    include: {
      user: true,
      skill: true,
    },
  });
  res.status(200).send(profile);
}

export { updateProfile, getProfile };