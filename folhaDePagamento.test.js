/* eslint-disable linebreak-style */
import { somaHorasExtras, calculaDescontos } from './index';

describe('Tests to paper calcule', () => {
  it('Should be returned a extra hour sum', () => {
    const esperado = 2500;
    const retornado = somaHorasExtras(2000, 500);

    expect(retornado).toBe(esperado);
  });

  it('Should be discount salary`s value', () => {
    const esperado = 2300;
    const retornado = calculaDescontos(2500, 200);

    expect(retornado).toBe(esperado);
  });
});
