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
beforeAll(() => {
    server = index_1.app.listen(4000);
});
describe('Test the GET /project path', () => {
    test('It should respond to the GET method with all projects', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/project');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
});
describe('Test the GET /project/:id/comments path', () => {
    test('It should respond with the comments for the given project ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // actual prisma project id with a comment
        const response = yield (0, supertest_1.default)(index_1.app).get(`/project/${projectId}/comments`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
});
afterAll((done) => {
    server.close(done);
});
