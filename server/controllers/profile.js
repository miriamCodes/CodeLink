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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.user);
        const id = +req.params.id;
        const { firstName, lastName, bio } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
        const user = yield prisma.user.findUnique({ where: { auth0Id: userId } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        yield prisma.profile.update({
            where: { userId: user.id },
            data: {
                bio,
            }
        });
        (0, user_1.updateUser)(firstName, lastName, id);
        res.status(200).send({ key: 'PROFILE CORRECTLY UPDATED' });
    });
}
exports.updateProfile = updateProfile;
function getProfile(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.user);
        const userId = +((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub);
        const profile = yield prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                user: true,
                skill: true,
            },
        });
        if (profile) {
            res.status(200).send(profile);
        }
        else {
            res.status(404).send('Profile not found');
        }
    });
}
exports.getProfile = getProfile;
