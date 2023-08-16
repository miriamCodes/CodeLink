import express, { Router } from 'express';
import { postUser, getUser } from './controllers/user';
import { postSkill } from './controllers/skill';
import { updateProfile, getProfile } from './controllers/profile';
const router: Router = express.Router();


router.get('/home', );

router.post('/register', );
router.post('/login', );
router.post('/create-profile', postUser);
router.post('/create-skill', postSkill);
router.get('/profile/:id', ); // WHEN AUTH STUFF IS CLEAR
router.get('/profile', getProfile);
router.put('/update-profile', updateProfile); // MAYBE ALSO ADD ID
router.get('/home/username', );


export { router };