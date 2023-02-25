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

        expect(response.body[0].email).toEqual('e@e.com'); // O email é especificado após saber o que deve receber
    });
});

let getIdResponse;
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

    it('Shouldn`t add nothing when empty body', async () => {
        await request(app)
            .post('/editoras')
            .send({})
            .expect(400);
    });
});

describe('GET in /editoras/id', () => {
    it('Should return the data selected by id', async () => {
        await request(app)
            .get(`/editoras/${getIdResponse}`)
            .expect(200);
    });
});

describe('PUT in /editoras/id', () => {

    // Pode ser feito o test como se fosse um POST quando atualizado apenas um campo ou it.each para modificação de mais campos
    it.skip('Should update name`s field', async () => {
        await request(app)
            .put(`/editoras/${getIdResponse}`)
            .send({ nome: 'CASA DO CODIGO987456'})
            .expect(204);
    });

    // Usar each faz o teste com cada laço do array, passando indice por indice que esta como objeto
    it.skip.each([
        { nome: 'CASA DO CODIGO987456'},  // Primeiro
        { cidade: 'Franca'},        // Segundo
        { email: 'leo@leo.com'},     // Terceiro
    ])('Should update all fields by object`s array', async (params) => {
        await request(app)
            .put(`/editoras/${getIdResponse}`)
            .send(params)
            .expect(204);
    });

    // Utiliza o objeto do array dentro de arrays separados para referenciar o nome dos campos a serem editados no nome do teste através do %s 
    it.each([
        ['nome',{ nome: 'CASA DO CODIGO987456'}],  
        ['cidade',{ cidade: 'Franca'}],
        ['email',{ email: 'leo@leo.com'}],
    ])('Should update %s field', async (chave, param) => {
        await request(app)
            .put(`/editoras/${getIdResponse}`)
            .send(param)
            .expect(204);
    });
});

describe('DELETE in /editoras/id', () => {
    it('Should delete a publishing created in test before', async () => {
        await request(app)
            .delete(`/editoras/${getIdResponse}`)
            .expect(200);
    });
});