import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

async function postUser(req: Request, res: Response) {
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
  res.status(201).send({key:'USER CREATED'});
}

async function getUser(req: Request, res: Response) {
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
}

async function updateUser(firstName: string, lastName: string, gitHub: string, id: number) {
  id = 1;
  await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      gitHub
    }
  });
}

export { postUser, getUser, updateUser };