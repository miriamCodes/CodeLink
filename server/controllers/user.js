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
        const { firstName, lastName, email, bio } = req.body;
        yield prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                profile: {
                    create: { bio },
                },
            },
        });
        res.status(201).send({ key: 'USER CREATED' });
    });
}
exports.postUser = postUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.getUser = getUser;
function updateUser(firstName, lastName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        id = 4;
        yield prisma.user.update({
            where: { id },
            data: {
                firstName,
                lastName
            }
        });
    });
}
exports.updateUser = updateUser;
