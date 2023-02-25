import app from '../../app';
import request from 'supertest';

let server;
// beforeEach and afterEach are Hooks to config the server
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GET in /editoras', () => {
    it('Should return a publishing list', async () => {
        const response = await request(app)
            .get('/editoras')
            .set('Accept', 'application/json') //.set its used to set headers
            .expect('content-type', /json/)
            .expect(200);

        expect(response.body[1].email).toEqual('m@m.com'); // O email é especificado após saber o que deve receber
    });
});

let getIdResponse
describe('POST in /editoras', () => {
    it('Should add a new publishing', async () => {
        const getPublishCreated = await request(app)
            .post('/editoras')
            .send({
                nome: "CDC",
                cidade: "Sao Paulo",
                email: "c@c.com"
            })
            .expect(201);
        // The expect can be in a new line like expect(getPublishCreated.statusCode).tobe(201);    

        //It used to pass a params to delete/get in next test;
        getIdResponse = getPublishCreated.body.content.id; 
    });
});

describe('DELETE in /editoras/id', () => {
    it('Should delete a publishing created in test before', async () => {
        await request(app)
            .delete(`/editoras/${getIdResponse}`)
            .expect(200);
    });
});

describe('GET in /editoras/id', () => {
    it('Should return the data selected by id', async () => {
        await request(app)
            .delete(`/editoras/${getIdResponse}`)
            .expect(200);
    });
});