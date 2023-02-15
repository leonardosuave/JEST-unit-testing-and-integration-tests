/* eslint-disable linebreak-style */
import Item from '../item';

describe('item`s tests', () => {
  it('Should have 3 fields: name, value and quantity', () => {
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  it('Should have calculate price according to quantity', () => {
    const item = new Item('Batata', 0.3, 10);

    expect(item.pegaValorTotalItem()).toBe(3);
  });
});
