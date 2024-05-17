/* global global */ // no topo do seu arquivo para informar ao ESLint que global é uma variável global.
// Importa duas funções do arquivo API.js
import { buscaListaFilmes, buscaDetalhesFilme } from "../test/API.js";
// Importa dois mocks do arquivo Mock.js
import { mockParaTeste, mockParaTeste2 } from "./Mock.js";

// Substitui a função global fetch pela função jest.fn que retorna uma Promise que resolve para mockParaTeste
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockParaTeste) }));

// Inicia um bloco de testes para a função buscaListaFilmes
describe('buscaListaFilmes', () => {

  // Define um teste individual dentro do bloco de testes
  it('deve chamar fetch com a URL correta', async () => {

    // Chama a função buscarFilmes
    await buscaListaFilmes();

    // Verifica se a função fetch foi chamada com a URL correta
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=10342',
      expect.any(Object)
    );
  });
});

// Define uma constante com o ID do filme
const filmeId = '#123';

// Substitui a função global fetch pela função jest.fn que retorna uma Promise que resolve para mockParaTeste
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockParaTeste2) }));

// Inicia um bloco de testes para a função buscaDetalhesFilme
describe('buscaDetalhesFilme', () => {

  // Define um teste individual dentro do bloco de testes
  it('deve chamar fetch com a URL correta', async () => {

    // Chama a função buscaDetalhesFilme com o ID do filme
    await buscaDetalhesFilme(filmeId);

    // Verifica se a função fetch foi chamada com a URL correta
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123?language=pt-BR&with_companies=10342',
      expect.any(Object)
    );
  });
})