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
exports.deleteSkill = exports.updateSkill = exports.postSkill = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function postSkill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, skill, experience, level } = req.body;
            yield prisma.skill.create({
                data: {
                    programmingSkill: skill, experience, level, profileId: id
                },
            });
            res.status(201).send({ key: 'SKILL CREATED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while creating the skill' });
        }
    });
}
exports.postSkill = postSkill;
function updateSkill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, skill, experience, level } = req.body;
            yield prisma.skill.update({
                where: { id },
                data: {
                    programmingSkill: skill,
                    experience,
                    level,
                },
            });
            res.status(200).send({ key: 'SKILL CORRECTLY UPDATED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while updating the skill' });
        }
    });
}
exports.updateSkill = updateSkill;
function deleteSkill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            yield prisma.skill.delete({
                where: {
                    id,
                },
            });
            res.status(200).send({ key: 'SKILL DELETED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while deleting the skill' });
        }
    });
}
exports.deleteSkill = deleteSkill;
