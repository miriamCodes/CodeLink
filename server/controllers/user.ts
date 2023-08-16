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
      posts: true,
      profile: true,
    },
  });
  res.status(200).send(user);
}

export { postUser, getUser };