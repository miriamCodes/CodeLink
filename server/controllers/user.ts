import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function postUser(req: Request, res: Response) {
  const { firstName, lastName, email, bio } = req.body;
  const auth0Id = req.user?.sub;

  let user;
  try {
    user = await prisma.user.upsert({
      where: { auth0Id },
      update: { firstName, lastName, email },
      create: {
        auth0Id,
        firstName,
        lastName,
        email,
        profile: {
          create: { bio },
        },
      },
    });
    res.status(201).send({ key: 'USER CREATED OR UPDATED', user });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create or update user', message: error.message });
  }
}

async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        profile: true,
      },
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user', message: error.message });
  }
}

async function updateUser(req: Request, res: Response) {
  const { firstName, lastName } = req.body;
  const { id } = req.params; 

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
      },
    });
    res.status(200).send({ key: 'USER UPDATED' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update user', message: error.message });
  }
}

async function getUserProfile(req: Request, res: Response) {
  const auth0Id = req.user?.sub; 

  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: { profile: true },
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user profile', message: error.message });
  }
}

export { postUser, getUser, updateUser, getUserProfile };
