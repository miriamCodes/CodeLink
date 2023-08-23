import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
async function postSkill (req: Request, res: Response) {
  try {
    const { id, skill, experience, level } = req.body;
    await prisma.skill.create({
      data: {
        programmingSkill: skill, experience, level, profileId: id
      }
    });
    res.status(201).send({ key: 'SKILL CREATED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while creating the skill' });
  }
}

async function updateSkill (req: Request, res: Response) {
  try {
    const { id, skill, experience, level } = req.body;
    await prisma.skill.update({
      where: { id },
      data: {
        programmingSkill: skill,
        experience,
        level
      }
    });
    res.status(200).send({ key: 'SKILL CORRECTLY UPDATED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while updating the skill' });
  }
}

async function deleteSkill (req: Request, res: Response) {
  try {
    const { id } = req.body;
    await prisma.skill.delete({
      where: {
        id
      }
    });
    res.status(200).send({ key: 'SKILL DELETED' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: 'An error occurred while deleting the skill' });
  }
}

export { postSkill, updateSkill, deleteSkill };
