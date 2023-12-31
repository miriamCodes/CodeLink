import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// Get all projects
async function getProjects (req: Request, res: Response) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        comments: true
      }
    });
    res.status(200).send(projects);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while fetching the projects' });
  }
}

// Post a new project
async function postProject (req: Request, res: Response) {
  try {
    const { title, description, stack, timeline, authorId } = req.body;
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        stack,
        timeline,
        authorId
      }
    });
    res.status(201).send({ ...newProject, comments: [] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while creating the project' });
  }
}

// Get comments for a specific project
async function getProjectComments (req: Request, res: Response) {
  try {
    const id = req.params.id;
    const comments = await prisma.comment.findMany({
      where: {
        projectId: id
      }
    });
    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while fetching the comments' });
  }
}

// Post a comment for a specific project
async function postProjectComment (req: Request, res: Response) {
  const projectId = req.params.id;
  const { text, authorId } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        text,
        projectId,
        authorId
      }
    });
    res.status(201).send(newComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while posting the comment' });
  }
}

// Post a like for a specific project
const postProjectLike = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });
    if (!project) {
      return res.status(404).send({ error: 'Project not found' });
    }

    let updatedLikes = project.likes;
    updatedLikes += 1;
    await prisma.project.update({
      where: { id: projectId },
      data: { likes: updatedLikes }
    });

    res.status(200).send({ likes: updatedLikes });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'An error occurred while incrementing the likes of the project'
    });
  }
};

// delete a like for a specific project
const postProjectUnlike = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return res.status(404).send({ error: 'Project not found' });
    }

    let updatedLikes = project.likes;

    updatedLikes -= 1;
    await prisma.project.update({
      where: { id: projectId },
      data: { likes: updatedLikes }
    });

    res.status(200).send({ likes: updatedLikes });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'An error occurred while decrementing the likes of the project'
    });
  }
};

export {
  getProjects,
  postProject,
  getProjectComments,
  postProjectComment,
  postProjectLike,
  postProjectUnlike
};
