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
  });

  // Teste de erro de propósito (exceções)
  it('Should have error when finish without itens', () => {
    const englobaErroCarrinho = () => {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    };

    expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
  });

  // test:coverage -> 100% lines
  it('Should add freight', () => {
    const item = new Item('Banana', 2, 5);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adicionaFrete(5.52);

    expect(carrinho.frete).not.toBeNull();
    expect(carrinho.calculaTotal()).toBe(15.52);
    // eslint-disable-next-line max-len
    expect(carrinho.finalizaCompra()).toStrictEqual({ //  Falso positivo porque calculaTotal não seria testado individualmente
      subtotal:10,
      frete:5.52,
      total: 15.52
    });
  });
});
