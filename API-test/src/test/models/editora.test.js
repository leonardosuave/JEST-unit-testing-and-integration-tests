import { jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Should test publishing model', () => {
    const objetoEditora = {
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 'c@c.com'
    };

    it('Should call a new publishing', () => {
        const publishing = new Editora(objetoEditora);

        // Compara 2 objetos
        expect(publishing).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });

    // .skip pula o teste
    it.skip('Should save publishing in database by then', async () => {
        const publishing = new Editora(objetoEditora);

        publishing.salvar().then((getResult) => {
            expect(getResult.nome).toBe('CDC');
        }); 
    });

    it.skip('Should save publishing in database by async/await', async () => {
        const publishing = new Editora(objetoEditora);
        const getResult = await publishing.salvar();
        const resultReturned = await Editora.pegarPeloId(getResult.id)

        expect(getResult.nome).toBe('CDC');
        expect(resultReturned).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );    
    });

    it('Sould simulate a call to database', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar = jest.fn().mockReturnValue({
            id: 10,
            nome: 'CDC',
            cidade: 'Sao Paulo',
            email: 'c@c.com',
            created_at: '2022-10-01',
            updated_at: '2022-10-01'
        });

        const getReturn = editora.salvar();

        expect(getReturn).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );    
    });
});