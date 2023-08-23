import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

async function postUser (req: Request, res: Response) {
  try {
    const { firstName, lastName, email, bio, gitHub } = req.body;
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        gitHub,
        profile: {
          create: { bio }
        }
      }
    });
    res.status(201).send({ key: 'USER CREATED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while posting the user' });
  }
}

async function getUser (req: Request, res: Response) {
  try {
    const { id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        profile: true
      }
    });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .send({ error: 'No profiles were found for the given ID' });
  }
}

async function updateUser (firstName: string, lastName: string, gitHub: string, id: number) {
  try {
    id = 1;
    await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        gitHub
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export { postUser, getUser, updateUser };
