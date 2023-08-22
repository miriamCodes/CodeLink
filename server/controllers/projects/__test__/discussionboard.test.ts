import request from 'supertest';
import { app } from '../../../index';
import { Server } from 'http';

let server: Server;

beforeAll(() => {
  server = app.listen(4000);
});

describe('Test the GET /project path', () => {
  test('It should respond to the GET method with all projects', async () => {
    const response = await request(app).get('/project');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('Test the GET /project/:id/comments path', () => {
  test('It should respond with the comments for the given project ID', async () => {
    const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // actual prisma project id with a comment
    const response = await request(app).get(`/project/${projectId}/comments`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

afterAll((done) => {
  server.close(done);
});
