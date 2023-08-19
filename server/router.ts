
import express, { Router } from 'express';
import { postUser, getUser } from './controllers/user';
import { postSkill } from './controllers/skill';
import { updateProfile, getProfile } from './controllers/profile';
import { fetchNews } from './APIs/news';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();

router.get('/home',);

router.post('/register',);
router.post('/login',);
router.post('/create-profile', postUser);
router.post('/create-skill', postSkill);

// router.get('/profile/:id', ); // WHEN AUTH STUFF IS CLEAR
router.get('/profile/:id', getProfile);
router.put('/update-profile/:id', updateProfile); // MAYBE ALSO ADD ID
router.get('/home/username',);
router.get('/news', fetchNews);

export { router };
