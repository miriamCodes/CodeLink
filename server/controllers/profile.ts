import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { updateUser } from './user';
import { AuthRequest } from '../auth/authTypes';

const prisma = new PrismaClient();


async function updateProfile(req: AuthRequest, res: Response) {
  console.log(req.user);
  
  const id = +req.params.id;
  const { firstName, lastName, bio } = req.body;
  const userId = req.user?.sub;
  const user = await prisma.user.findUnique({ where: { auth0Id: userId } });
  if (!user) {
    return res.status(404).send('User not found');
  }
  await prisma.profile.update({
    where: { userId: user.id },
    data: {
      bio,
    }
  });
  updateUser(firstName, lastName, id);
  res.status(200).send({ key: 'PROFILE CORRECTLY UPDATED' });
}

async function getProfile(req: AuthRequest, res: Response) {
  console.log(req.user);
  
  const userId = +req.user?.sub;
  const profile = await prisma.profile.findUnique({
    where: {
      userId
    },
    include: {
      user: true,
      skill: true,
    },
  });
  if (profile) {
    res.status(200).send(profile);
  } else {
    res.status(404).send('Profile not found');
  }
}

export { updateProfile, getProfile };