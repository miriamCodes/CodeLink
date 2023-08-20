import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// Get all projects
async function getProjects(req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    include: {
      comments: true,
    },
  });
  res.status(200).send(projects);
}

// Post a new project
async function postProject(req: Request, res: Response) {
  const { title, description, stack, timeline } = req.body;
  const newProject = await prisma.project.create({
    data: {
      title,
      description,
      stack,
      timeline,
    },
  });
  res.status(200).send(newProject);
}

// Get comments for a specific project
async function getProjectComments(req: Request, res: Response) {
  const id = req.params.id;
  const comments = await prisma.comment.findMany({
    where: {
      projectId: id,
    },
  });
  res.status(200).send(comments);
}

// Post a comment for a specific project
async function postProjectComment(req: Request, res: Response) {
  const id = req.params.id;
  const { text } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      text,
      projectId: id,
    },
  });
  res.status(200).send(newComment);
}

// Post a vote/like for a specific project

export const postProjectVote = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const { action } = req.body;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    let updatedVotes = project.votes;
    if (action === 'like') {
      updatedVotes += 1;
    } else if (action === 'unlike') {
      updatedVotes -= 1;
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { votes: updatedVotes },
    });

    res.json({ votes: updatedVotes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the project' });
  }
};

export {
  getProjects,
  postProject,
  getProjectComments,
  postProjectComment,
  postProjectVote,
};
