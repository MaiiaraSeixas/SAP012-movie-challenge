/* global global */ // no topo do seu arquivo para informar ao ESLint que global é uma variável global.
import { buscaListaFilmes, buscaDetalhesFilme } from "../test/API.js";
import { mockParaTeste, mockParaTeste2 } from "./Mock.js";

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockParaTeste) }));

describe('buscaListaFilmes', () => {

  it('deve chamar fetch com a URL correta', async () => {

    await buscaListaFilmes();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=10342&without_companies=15505',
      expect.any(Object)
    );
  });
});

const filmeId = '#123';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockParaTeste2) }));

describe('buscaDetalhesFilme', () => {

  it('deve chamar fetch com a URL correta', async () => {

    await buscaDetalhesFilme(filmeId);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123?language=pt-BR&with_companies=10342',
      expect.any(Object)
    );
  });
})