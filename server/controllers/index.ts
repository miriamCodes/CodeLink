import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
async function main() {
  // ... we write our Prisma Client queries here

  await prisma.profile.update({
    where: { id: 10 },
    data: {       
      skill: {
      create: {programmingSkill: 'Java', experience: 2, level: 'beginner' }
    }}
  });

  await prisma.skill.create({
    data: {
      programmingSkill: 'React', experience: 4, level: 'advanced',  profileId: 9
    },
  });
  
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true, title: 'This title has been changed'},
  });
  console.log(post);
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
*/

