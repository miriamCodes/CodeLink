import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { updateUser } from './user';

const prisma = new PrismaClient();

async function updateProfile (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const { firstName, lastName, bio, gitHub } = req.body;
    await prisma.profile.update({
      where: { id },
      data: {
        bio
      }
    });
    updateUser(firstName, lastName, gitHub, id);
    res.status(200).send({ key: 'PROFILE CORRECTLY UPDATED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while updating the profile' });
  }
}

async function getProfile (req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const profile = await prisma.profile.findUnique({
      where: {
        id
      },
      include: {
        user: true,
        skill: true
      }
    });
    res.status(200).send(profile);
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .send({ error: 'No profiles were found for the given ID' });
  }
}

export { updateProfile, getProfile };
