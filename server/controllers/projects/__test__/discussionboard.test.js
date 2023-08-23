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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../../index");
let server;
global.console.error = jest.fn();
beforeAll(() => {
    server = index_1.app.listen(4000);
});
describe('Test the GET /project path', () => {
    const projectPath = '/project';
    test('It should respond to the GET method with all projects', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get(projectPath);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('comments');
        expect(res.body[0].comments).toBeInstanceOf(Array);
        expect(res.body[0].comments[0]).toHaveProperty('id');
        expect(res.body[0].comments[0]).toHaveProperty('text');
    }));
});
describe('Test the POST /project path', () => {
    const projectPath = '/project';
    test('should create a project and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProjectData = {
            title: 'Test Project',
            description: 'This is a test project',
            stack: ['React', 'Node.js'],
            timeline: '1 month',
            authorId: 2,
        };
        const res = yield (0, supertest_1.default)(index_1.app).post(projectPath).send(newProjectData);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(newProjectData.title);
        expect(res.body.description).toBe(newProjectData.description);
        expect(res.body.stack).toEqual(newProjectData.stack);
        expect(res.body.timeline).toBe(newProjectData.timeline);
        expect(res.body.authorId).toBe(newProjectData.authorId);
        expect(res.body.id).toBeDefined();
    }));
    test('should return 500 if an error occurs when creating a project', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidProjectData = {
            description: 'This is a test project',
            stack: ['React', 'Node.js'],
            timeline: '1 month',
        };
        const res = yield (0, supertest_1.default)(index_1.app).post(projectPath).send(invalidProjectData);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({
            error: 'An error occurred while creating the project',
        });
    }));
});
describe('Test the GET /project/:id/comments path', () => {
    test('It should respond with the comments for the given project ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // id from seed file
        const res = yield (0, supertest_1.default)(index_1.app).get(`/project/${projectId}/comment`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('text');
        expect(res.body[0].projectId).toEqual(projectId);
    }));
});
describe('Test the POST /project/:id/comments path', () => {
    const projectPathComment = '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/comment';
    test('should create a project and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const newComment = {
            text: 'want to colab on that?',
            authorId: 3,
        };
        const res = yield (0, supertest_1.default)(index_1.app).post(projectPathComment).send(newComment);
        expect(res.status).toBe(201);
        expect(res.body.text).toBe(newComment.text);
        expect(res.body.authorId).toBe(newComment.authorId);
        expect(res.body.id).toBeDefined();
    }));
});
describe('Test the POST /project/:id/like path', () => {
    const projectPathLike = '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/like';
    test('should increment the number of likes and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post(projectPathLike).send();
        expect(res.status).toBe(200);
        expect(res.body.likes).toBeDefined();
    }));
});
describe('Test the DELETE /project/:id/like path', () => {
    const projectPathLike = '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/like';
    test('should decrement the number of likes and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).delete(projectPathLike).send();
        expect(res.status).toBe(200);
        expect(res.body.likes).toBeDefined();
    }));
});
describe('Test the GET /project/:id endpoint that doesnt exist', () => {
    test('It should respond with the comments for the given project ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // id from seed file
        const res = yield (0, supertest_1.default)(index_1.app).get(`/project/${projectId}`);
        expect(res.statusCode).toBe(404);
    }));
});
afterAll((done) => {
    server.close(done);
});
