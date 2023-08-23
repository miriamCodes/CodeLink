// SEEDS FOR PROJECTS IN DISCUSSION-BOARD
// https://www.prisma.io/docs/guides/migrate/seed-database for how to create more seed data

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main () {
  const users = await Promise.all([
    createUser(2, 'me2', 'me2@me.com'),
    createUser(3, 'me3', 'me3@me.com')
  ]);

  const projects = await Promise.all([
    createProject(
      'f5e1fd39-0bef-46a5-bb2a-b38b3d238969',
      'todo-list1',
      users[0].id
    ),
    createProject(
      'f3105dbb-5e16-48b4-b3b6-bdaf8435bec6',
      'todo-list2',
      users[1].id
    )
  ]);

  const comments = await Promise.all([
    createComment('Great project!', projects[0].id, users[1].id),
    createComment('Awesome work!', projects[1].id, users[0].id)
  ]);

  console.log({ users, projects, comments });
}

async function createUser (id: number, username: string, email: string) {
  return prisma.user.upsert({
    where: { id },
    update: {},
    create: {
      id,
      username,
      auth0Id: `auth0Id-${username}`,
      email,
      firstName: username,
      lastName: 'last' + username,
      gitHub: 'github.com/' + username
    }
  });
}

async function createProject (id: string, title: string, authorId: number) {
  return prisma.project.upsert({
    where: { id },
    update: {},
    create: {
      id,
      title,
      description: 'coolest project ever',
      stack: ['Express', 'MongoDB', 'React'],
      timeline: '1 month',
      likes: 1,
      authorId
    }
  });
}

async function createComment (
  text: string,
  projectId: string,
  authorId: number
) {
  return prisma.comment.create({
    data: {
      text,
      projectId,
      authorId
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
