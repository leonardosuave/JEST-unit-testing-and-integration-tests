/* eslint-disable linebreak-style */
import Carrinho from '../carrinho';
import Item from '../item';

describe('Carrinho`s test', () => {
  it('Should start empty', () => {
    const carrinho = new Carrinho();

    expect(carrinho.subtotal).toBeNull();
  });

  it('Should have itens', () => {
    const item = new Item('Banana', 2, 5);
    const item2 = new Item('Maca', 0.5, 1);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe('object');
    expect(carrinho.itens[0]).toBe(item);
    expect(carrinho.itens[1]).toBe(item2);

    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
    
  });

  it('Should have total property', () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty('total');
  })
});
