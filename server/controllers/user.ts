import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
async function postUser(req: Request, res: Response){
  console.log('GOT HERE BABY');
  console.log(req.body);
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
  res.status(201).send('USER CREATED');
}

export { postUser };