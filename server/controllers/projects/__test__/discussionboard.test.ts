import request from 'supertest';
import { app } from '../../../index';
import { Server } from 'http';

let server: Server;
global.console.error = jest.fn();

beforeAll(() => {
  server = app.listen(4000);
});

describe('Test the GET /project path', () => {
  const projectPath = '/project';
  test('It should respond to the GET method with all projects', async () => {
    const res = await request(app).get(projectPath);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('comments');
    expect(res.body[0].comments).toBeInstanceOf(Array);
    expect(res.body[0].comments[0]).toHaveProperty('id');
    expect(res.body[0].comments[0]).toHaveProperty('text');
  });
});

describe('Test the POST /project path', () => {
  const projectPath = '/project';
  test('should create a project and return 201', async () => {
    const newProjectData = {
      title: 'Test Project',
      description: 'This is a test project',
      stack: ['React', 'Node.js'],
      timeline: '1 month',
      authorId: 2,
    };

    const res = await request(app).post(projectPath).send(newProjectData);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProjectData.title);
    expect(res.body.description).toBe(newProjectData.description);
    expect(res.body.stack).toEqual(newProjectData.stack);
    expect(res.body.timeline).toBe(newProjectData.timeline);
    expect(res.body.authorId).toBe(newProjectData.authorId);
    expect(res.body.id).toBeDefined();
  });
  test('should return 500 if an error occurs when creating a project', async () => {
    const invalidProjectData = {
      description: 'This is a test project',
      stack: ['React', 'Node.js'],
      timeline: '1 month',
    };

    const res = await request(app).post(projectPath).send(invalidProjectData);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: 'An error occurred while creating the project',
    });
  });
});

describe('Test the GET /project/:id/comments path', () => {
  test('It should respond with the comments for the given project ID', async () => {
    const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // id from seed file
    const res = await request(app).get(`/project/${projectId}/comment`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('text');
    expect(res.body[0].projectId).toEqual(projectId);
  });
});

describe('Test the POST /project/:id/comments path', () => {
  const projectPathComment =
    '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/comment';
  test('should create a project and return 201', async () => {
    const newComment = {
      text: 'want to colab on that?',
      authorId: 3,
    };
    const res = await request(app).post(projectPathComment).send(newComment);

    expect(res.status).toBe(201);
    expect(res.body.text).toBe(newComment.text);
    expect(res.body.authorId).toBe(newComment.authorId);
    expect(res.body.id).toBeDefined();
  });
});

describe('Test the POST /project/:id/like path', () => {
  const projectPathLike = '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/like';
  test('should increment the number of likes and return 200', async () => {
    const res = await request(app).post(projectPathLike).send();

    expect(res.status).toBe(200);
    expect(res.body.likes).toBeDefined();
  });
});
describe('Test the DELETE /project/:id/like path', () => {
  const projectPathLike = '/project/f5e1fd39-0bef-46a5-bb2a-b38b3d238969/like';
  test('should decrement the number of likes and return 200', async () => {
    const res = await request(app).delete(projectPathLike).send();

    expect(res.status).toBe(200);
    expect(res.body.likes).toBeDefined();
  });
});

describe('Test the GET /project/:id endpoint that doesnt exist', () => {
  test('It should respond with the comments for the given project ID', async () => {
    const projectId = 'f5e1fd39-0bef-46a5-bb2a-b38b3d238969'; // id from seed file
    const res = await request(app).get(`/project/${projectId}`);
    expect(res.statusCode).toBe(404);
  });
});

afterAll((done) => {
  server.close(done);
});
