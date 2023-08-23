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
exports.deleteRepo = exports.getPortfolio = exports.postRepo = exports.repoFilter = void 0;
const client_1 = require("@prisma/client");
const github_1 = require("../APIs/github");
const prisma = new client_1.PrismaClient();
function repoFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.params.username;
            let repos = yield (0, github_1.fetchRepositories)(username);
            repos = repos.filter((el) => el.stargazers_count > 0);
            res.status(200).send(repos);
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while fetching the repositories from GitHub' });
        }
    });
}
exports.repoFilter = repoFilter;
function postRepo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repos = req.body.selectedRepos;
            repos.map((el) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.repository.create({
                    data: {
                        name: el.name,
                        description: el.description,
                        updatedAt: el.updated_at,
                        createdAt: el.created_at,
                        stars: el.stargazers_count,
                        watchers: el.watchers,
                        language: el.language,
                        profileId: 1
                    },
                });
            }));
            res.status(201).send({ key: 'REPO CREATED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while posting the repositories' });
        }
    });
}
exports.postRepo = postRepo;
function getPortfolio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const { id } = req.body;
            const id = +req.params.id;
            const portfolio = yield prisma.repository.findMany({
                where: {
                    profileId: id
                },
            });
            res.status(200).send(portfolio);
        }
        catch (error) {
            console.error(error);
            res
                .status(404)
                .send({ error: 'No repositories were found for the given ID' });
        }
    });
}
exports.getPortfolio = getPortfolio;
function deleteRepo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            yield prisma.repository.delete({
                where: {
                    id,
                },
            });
            res.status(200).send({ key: 'REPO DELETED' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ error: 'An error occurred while deleting the repositories' });
        }
    });
}
exports.deleteRepo = deleteRepo;
