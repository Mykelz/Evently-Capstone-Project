const request = require('supertest');

const app = require('../app');

let server;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});


describe('reisterUser e2e', ()=>{
    it(' should register a user', async ()=>{
        const res = await request(app).post('/auth/signup').send({
            first_name: 'test',
            last_name: 'test',
            email: 'test@e2e.com',
            password: 'password'
        })
        console.log(res)
    })
    
    // expect.res.status.toBe(201);
})