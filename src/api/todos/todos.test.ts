import request from 'supertest';
import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
});

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
  test.only('responds with inserted object', async () =>
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
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body.done).toBe(false);
      }),
  );
});
