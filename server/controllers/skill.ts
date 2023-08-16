import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
async function postSkill(req: Request, res: Response) {
  const { id, skill, experience, level } = req.body;
  await prisma.skill.create({
    data: {
      programmingSkill: skill, experience, level, profileId: id
    },
  });
  res.status(201).send({key: 'SKILL CREATED'});
}

async function updateSkill(req: Request, res: Response) {
  const { id, skill, experience, level } = req.body;
  await prisma.skill.update({
    where: { id },
    data: {
      programmingSkill: skill,
      experience,
      level, 
    },
  });
  res.status(201).send({key: 'SKILL CORRECTLY UPDATED'});
}


export { postSkill, updateSkill};