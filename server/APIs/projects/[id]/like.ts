import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.id as string;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (req.method === 'POST') {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: { votes: project.votes + 1 },
      });

      res.json({ votes: updatedProject.votes });
    } else if (req.method === 'DELETE') {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: { votes: Math.max(project.votes - 1, 0) },
      });

      res.json({ votes: updatedProject.votes });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the project' });
  }
}
