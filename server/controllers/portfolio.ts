import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { fetchRepositories } from '../APIs/github';

const prisma = new PrismaClient();

async function repoFilter(req: Request, res: Response) {
  console.log('GOT HERE');
  console.log(req.params.username);
  
  
  const username = req.params.username;
  let repos = await fetchRepositories(username);
  console.log(repos);
  repos = repos.filter((el) => el.stargazers_count > 0);
  res.send(repos);
}

async function postRepo(req: Request, res: Response) {
  const repos = req.body.repos;
  repos.map(async (el) => {
    await prisma.repository.create({
      data: {
        name: el.name,
        description: el.description,
        updatedAt: el.updated_at,
        createdAt: el.created_at,
        stars: el.stargazers_count,
        watchers: el.watchers,
        language: el.language,
        profileId: 1
      },
    });
  });
  res.status(201).send({ key: 'REPO CREATED' });
}

async function getPortfolio(req: Request, res: Response) {
  //const { id } = req.body;
  const id = +req.params.id;
  const portfolio = await prisma.repository.findMany({
    where: {
      profileId: id
    },
  });
  console.log(portfolio);
  res.status(200).send(portfolio);
}


// allow user to toggle choose/not choose

// when we edit: fetch to backend
// fetch from github api
// fetch fom db
// filter out ones already in db
// filter starred
// send to backend
// save to db

// delete repos

export { repoFilter, postRepo, getPortfolio };