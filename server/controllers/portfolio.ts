import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { fetchRepositories } from '../APIs/github';

const prisma = new PrismaClient();

async function repoFilter(req: Request, res: Response){
  const username = req.params.username;
  let repos = await fetchRepositories(username);
  repos = repos.filter((el) => el.stargazers_count > 0);
  res.send(repos);
}



// allow user to toggle choose/not choose
// when saved they are sent to backend
// saved to database

// when we edit: fetch to backend
// fetch from github api
// fetch fom db
// filter out ones already in db
// filter starred
// send to backend
// save to db

// delete repos

export { repoFilter };