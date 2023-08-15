import express, { Router } from 'express';
import { postUser } from './controllers/user';
import { postSkill } from './controllers/skill';

const router: Router = express.Router();


router.get('/home', );

router.post('/register', );
router.post('/login', );
router.post('/create-profile', postUser);
router.post('/create-skill', postSkill);
router.get('/profile', ); // Maybe userId
router.get('/home/username', );


export { router };