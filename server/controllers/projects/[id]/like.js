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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function handle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = req.query.id;
        try {
            const project = yield prisma.project.findUnique({
                where: { id: projectId },
            });
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            if (req.method === 'POST') {
                const updatedProject = yield prisma.project.update({
                    where: { id: projectId },
                    data: { votes: project.votes + 1 },
                });
                res.json({ votes: updatedProject.votes });
            }
            else if (req.method === 'DELETE') {
                const updatedProject = yield prisma.project.update({
                    where: { id: projectId },
                    data: { votes: Math.max(project.votes - 1, 0) },
                });
                res.json({ votes: updatedProject.votes });
            }
            else {
                res.status(405).json({ error: 'Method not allowed' });
            }
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: 'An error occurred while updating the project' });
        }
    });
}
exports.default = handle;
