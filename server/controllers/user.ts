import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

async function postUser(req: Request, res: Response) {
  const { firstName, lastName, email, bio } = req.body;
  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
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

async function updateUser(firstName: string, lastName: string, id: number) {
  id = 4;
  await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName
    }
  });
}

export { postUser, getUser, updateUser };