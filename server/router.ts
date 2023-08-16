import express, { Router } from 'express';
import { postUser, getUser } from './controllers/user';
// import checkJwt from './auth/authMiddleware';
// import { PrismaClient } from '@prisma/client';
// import { AuthRequest } from './auth/authTypes';
import { postSkill } from './controllers/skill';
import { updateProfile, getProfile } from './controllers/profile';
const router: Router = express.Router();

// const prisma = new PrismaClient();

router.get('/home', );

router.post('/register', );
router.post('/login', );
router.post('/create-profile', postUser);
router.post('/create-skill', postSkill);
// router.get('/profile/:id', ); // WHEN AUTH STUFF IS CLEAR
router.get('/profile/:id', getProfile);
router.put('/update-profile', updateProfile); // MAYBE ALSO ADD ID
router.get('/home/username', );
// router.get('/profile', checkJwt, async (req: AuthRequest, res) => {
//     console.log(req.headers.authorization);
//     const userId = req.user?.sub;
//     const userProfile = await prisma.user.findUnique({ where: { auth0Id: userId }, include: { profile: true } });

//     if (userProfile) {
//         res.json(userProfile);
//     } else {
//         res.status(404).send('Profile not found');
//     }
// }); // Maybe userId
// router.get('/home/:username', checkJwt, async (req, res) => {
//     const username = req.params.username;
//     const user = await prisma.user.findUnique({ where: { username } });

//     if (user) {
//         res.json(user);
//     }
//     else {
//         res.status(404).send('User not found');
//     }
//     //prima logic
// });


export { router };
