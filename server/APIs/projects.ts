import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      include: { author: true },
    });
    res.json(projects);
  } else if (req.method === 'POST') {
    const newProject = await prisma.project.create({ data: req.body });
    res.json(newProject);
  } else {
    res.status(405).end();
  }
}
