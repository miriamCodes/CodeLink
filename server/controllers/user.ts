import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function postUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, bio, gitHub } = req.body;
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        gitHub,
        profile: {
          create: { bio },
        },
      },
    });
    res.status(201).send({ key: 'USER CREATED' });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ key: 'USER CREATION NOT SUCCESSFUL' });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        profile: true,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ key: 'USER NOT FOUND' });
  }
}

async function updateUser(firstName: string, lastName: string, gitHub: string, id: number) {
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
