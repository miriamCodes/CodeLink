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
exports.getProfile = exports.updateProfile = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("./user");
const prisma = new client_1.PrismaClient();
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id;
        const { firstName, lastName, bio, gitHub } = req.body;
        yield prisma.profile.update({
            where: { id },
            data: {
                bio,
            }
        });
        (0, user_1.updateUser)(firstName, lastName, gitHub, id);
        res.status(200).send({ key: 'PROFILE CORRECTLY UPDATED' });
    });
}
exports.updateProfile = updateProfile;
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id;
        const profile = yield prisma.profile.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                skill: true,
            },
        });
        res.status(200).send(profile);
    });
}
exports.getProfile = getProfile;
