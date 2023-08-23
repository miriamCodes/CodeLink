"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./controllers/user");
const skill_1 = require("./controllers/skill");
const profile_1 = require("./controllers/profile");
const news_1 = require("./APIs/news");
const client_1 = require("@prisma/client");
const authMiddleware_1 = __importDefault(require("./auth/authMiddleware"));
const portfolio_1 = require("./controllers/portfolio");
const discussionboard_1 = require("./controllers/projects/discussionboard");
const router = express_1.default.Router();
exports.router = router;
const prisma = new client_1.PrismaClient();
router.get('/home');
router.get('/news', news_1.fetchNews);
router.get('/repos/:username', portfolio_1.repoFilter);
router.post('/create-repos', portfolio_1.postRepo);
router.delete('/delete-repo', portfolio_1.deleteRepo);
router.get('/portfolio/:id', portfolio_1.getPortfolio);
router.post('/register');
router.post('/login');
router.post('/create-profile', user_1.postUser);
router.post('/create-skill', skill_1.postSkill);
router.delete('/delete-skill', skill_1.deleteSkill);
router.get('/profile/:id'); // WHEN AUTH STUFF IS CLEAR
router.get('/profile/:id', profile_1.getProfile);
router.put('/update-profile/:id', profile_1.updateProfile); // MAYBE ALSO ADD ID
router.get('/home/username');
router.get('http://localhost:3000/profile', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.headers.authorization);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
    console.log('User ID from JWT:', userId);
    const userProfile = yield prisma.user.findUnique({ where: { auth0Id: userId }, include: { profile: true } });
    if (userProfile) {
        res.json(userProfile);
    }
    else {
        res.status(404).send('Profile not found');
    }
})); // Maybe userId
router.get('/home/:username', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield prisma.user.findUnique({ where: { username } });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
    //prima logic
}));
router.get('/project', discussionboard_1.getProjects);
router.post('/project', discussionboard_1.postProject);
router.get('/project/:id/comment', discussionboard_1.getProjectComments);
router.post('/project/:id/comment', discussionboard_1.postProjectComment);
router.post('/project/:id/like', discussionboard_1.postProjectLike);
router.delete('/project/:id/like', discussionboard_1.postProjectUnlike);
