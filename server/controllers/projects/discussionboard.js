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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProjectLike = exports.postProjectComment = exports.getProjectComments = exports.postProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all projects
function getProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield prisma.project.findMany({
            include: {
                comments: true,
            },
        });
        res.status(200).send(projects);
    });
}
exports.getProjects = getProjects;
// Post a new project
function postProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, stack, timeline, authorId } = req.body;
            const newProject = yield prisma.project.create({
                data: {
                    title,
                    description,
                    stack,
                    timeline,
                    authorId,
                },
            });
            res.status(201).send(newProject);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while creating the project' });
        }
    });
}
exports.postProject = postProject;
// Get comments for a specific project
function getProjectComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const comments = yield prisma.comment.findMany({
            where: {
                projectId: id,
            },
        });
        res.status(200).send(comments);
    });
}
exports.getProjectComments = getProjectComments;
// Post a comment for a specific project
function postProjectComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('I got here with the request: ', req.body);
        const projectId = req.params.id;
        const { text, userId } = req.body;
        try {
            const newComment = yield prisma.comment.create({
                data: {
                    text,
                    projectId,
                    authorId: userId
                },
            });
            res.status(201).send(newComment);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while posting the comment' });
        }
    });
}
exports.postProjectComment = postProjectComment;
// Post a like for a specific project
const postProjectLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const { action } = req.body;
    try {
        const project = yield prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        let updatedLikes = project.likes;
        if (action === 'like') {
            updatedLikes += 1;
        }
        else if (action === 'unlike') {
            updatedLikes -= 1;
        }
        else {
            return res.status(400).json({ error: 'Invalid action' });
        }
        yield prisma.project.update({
            where: { id: projectId },
            data: { likes: updatedLikes },
        });
        res.json({ likes: updatedLikes });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: 'An error occurred while updating the project' });
    }
});
exports.postProjectLike = postProjectLike;
