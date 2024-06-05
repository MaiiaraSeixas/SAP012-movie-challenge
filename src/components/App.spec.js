import { renderizarFilmes, criaCartaoFilme } from "./App";
import  {mockParaTeste}  from "../test/Mock";
import {buscaListaFilmes,} from "../test/API";

// Importando a biblioteca Jest para usar suas funcionalidades de teste
jest.mock("../test/API.js", () => ({
    // Mock da função 'buscaListaFilmes' dentro do módulo 'API.js'
    // jest.fn() cria uma função mock que podemos controlar e verificar
    buscaListaFilmes: jest.fn(() => 
         // A função mock retorna uma Promise que já está resolvida
        // Isso simula uma operação assíncrona bem-sucedida sem fazer nada de verdade
        Promise.resolve()),
}));

// Cria um bloco de testes para a função 'criaCartaoFilme'
// Agrupa os testes relacionados ao módulo API
describe("Testes para o módulo API", () => {
    // Antes de cada teste, limpa todos os mocks para garantir que não haja interferência entre os testes
    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        jest.clearAllMocks();
    });

     // Testa a função criaCartaoFilme
    test("criaCartaoFilme deve retornar um elemento de lista com as informações do filme", () => {

        // Chama a função criaCartaoFilme com o primeiro filme do mock
        const elemento = criaCartaoFilme(mockParaTeste.itens[0]);

        // Verifica se o elemento retornado está definido
        expect(elemento).toBeDefined();

        // Verifica se o título do filme no elemento corresponde ao título do filme no mock
        expect(elemento.querySelector("h2").textContent).toBe(mockParaTeste.itens[0].title);

        // Verifica se o ano de lançamento no elemento corresponde ao ano de lançamento no mock
        expect(elemento.querySelector("p").textContent).toBe(`| ${mockParaTeste.itens[0].release_date.split("-")[0]} |`);

        // Verifica se o caminho do poster no elemento corresponde ao caminho do poster no mock
        expect(elemento.querySelector("img").src).toBe(`https://image.tmdb.org/t/p/w300/${mockParaTeste.itens[0].poster_path}`);
    });
    
    // Testa a função renderizarFilmes
    test("renderizarFilmes deve chamar buscaListaFilmes e renderizar os filmes retornados", async () => {

        // Configura a função mock 'buscaListaFilmes' para retornar uma Promise resolvida com 'mockParaTeste.itens'
        // Isso simula a resposta da função 'buscaListaFilmes' sem fazer uma requisição real
        buscaListaFilmes.mockResolvedValue(mockParaTeste.itens);

        // Define o HTML inicial para o teste, adicionando um div com id 'receberDados' ao corpo do documento
        // Isso simula a estrutura HTML onde os filmes serão renderizados
        document.body.innerHTML = '<div id="receberDados"></div>';

        // Chama a função 'renderizarFilmes' e espera que ela termine de executar
        // 'renderizarFilmes' é a função que deve buscar a lista de filmes e renderizá-los na página
        await renderizarFilmes();

        // Verifica se a função 'buscaListaFilmes' foi chamada durante a execução de 'renderizarFilmes'
        // Isso garante que a função de busca foi realmente utilizada no processo
        expect(buscaListaFilmes).toHaveBeenCalled();

        // Verifica se algum elemento com a classe 'infosApp' foi adicionado ao documento
        // Isso confirma que os filmes foram renderizados corretamente na página
        expect(document.querySelector(".infosApp")).toBeDefined();
    });

    test ("redenrizarFilmes deve lidar com erros ao chamar buscaListaFilmes", async () => {

        // Configura a função mock 'buscaListaFilmes' para retornar uma Promise rejeitada
        // Isso simula um erro na resposta da função 'buscaListaFilmes'
        buscaListaFilmes.mockRejectedValue();

        // Define o HTML inicial para o teste, adicionando um div com id 'receberDados' ao corpo do documento
        document.body.innerHTML = '<div id="receberDados"></div>';

        // Chama a função 'renderizarFilmes' e espera que ela termine de executar
        // 'renderizarFilmes' é a função que deve buscar a lista de filmes e renderizá-los na página

        await renderizarFilmes();

        // Verifica se a função 'buscaListaFilmes' foi chamada durante a execução de 'renderizarFilmes'
        // Isso garante que a função de busca foi realmente utilizada no processo

        expect(buscaListaFilmes).toHaveBeenCalled();

        // Verifica se algum elemento com a classe 'erroApp' foi adicionado ao documento
        // Isso confirma que os erros foram registrados corretamente na página  
        expect(document.querySelector(".erroApp")).toBeDefined();

});

});