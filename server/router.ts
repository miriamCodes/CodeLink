import express, { Router } from 'express';
import checkJwt from './auth/authMiddleware';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from './auth/authTypes';
const router: Router = express.Router();

const prisma = new PrismaClient();

router.get('/home', );

router.post('/register', );
router.post('/login', );

router.get('/profile', checkJwt, async (req: AuthRequest, res) => {
    console.log(req.headers.authorization);
    const userId = req.user?.sub;
    const userProfile = await prisma.user.findUnique({ where: { auth0Id: userId }, include: { profile: true } });

    if (userProfile) {
        res.json(userProfile);
    } else {
        res.status(404).send('Profile not found');
    }
}); // Maybe userId
router.get('/home/username', checkJwt, async (req, res) => {
    const username = req.params.username;
    const user = await prisma.user.findUnique({ where: { username: username } });

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
    //prima logic
});


export { router };