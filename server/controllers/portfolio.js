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
exports.getPortfolio = exports.postRepo = exports.repoFilter = void 0;
const client_1 = require("@prisma/client");
const github_1 = require("../APIs/github");
const prisma = new client_1.PrismaClient();
function repoFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        let repos = yield (0, github_1.fetchRepositories)(username);
        repos = repos.filter((el) => el.stargazers_count > 0);
        res.send(repos);
    });
}
exports.repoFilter = repoFilter;
function postRepo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.postRepo = postRepo;
function getPortfolio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //const { id } = req.body;
        const id = +req.params.id;
        const portfolio = yield prisma.repository.findMany({
            where: {
                profileId: id
            },
        });
        res.status(200).send(portfolio);
    });
}
exports.getPortfolio = getPortfolio;
