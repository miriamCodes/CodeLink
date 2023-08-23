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
exports.updateUser = exports.getUser = exports.postUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, bio, gitHub } = req.body;
            yield prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    gitHub,
                    profile: {
                        create: { bio },
                    },
                },
            });
            res.status(201).send({ key: 'USER CREATED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while posting the user' });
        }
    });
}
exports.postUser = postUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const user = yield prisma.user.findUnique({
                where: {
                    id
                },
                include: {
                    profile: true,
                },
            });
            res.status(200).send(user);
        }
        catch (error) {
            console.error(error);
            res
                .status(404)
                .send({ error: 'No profiles were found for the given ID' });
        }
    });
}
exports.getUser = getUser;
function updateUser(firstName, lastName, gitHub, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            id = 1;
            yield prisma.user.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    gitHub
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateUser = updateUser;
