import request from 'supertest';
import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
});

let id = '';
const mockId = '63646e4f96d5d27108d71bdd';

describe('GET /api/v1/todos', () => {
  test('responds with an array of todos', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

describe('Post /api/v1/todos', () => {
  test('responds with an error if todo is invalid', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then(response => {
        expect(response.body).toHaveProperty('message');
      }),
  );
  test('responds with inserted object', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body.done).toBe(false);
      }),
  );
});

describe('GET /api/v1/todos/:id', () => {
  test('responds with a single todo', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body.done).toBe(false);
      }),
  );
  test('responds with an invalid Object Id error', () =>
    request(app)
      .get('/api/v1/todos/abc123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422),
  );
  test('responds with not found error', async () =>
    request(app)
      .get(`/api/v1/todos/${mockId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        expect(response.body.message).toBe(`Todo with id "${mockId}" not found`);
      }),
  );
});
