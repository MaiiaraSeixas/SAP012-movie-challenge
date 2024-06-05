import { renderizarFilmes, criaCartaoFilme } from "./App";
import  {mockParaTeste}  from "../test/Mock";
import {buscaListaFilmes,} from "../test/API";

jest.mock("../test/API.js", () => ({
    buscaListaFilmes: jest.fn(() => 
        Promise.resolve()),
}));

describe("Testes para o módulo API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("criaCartaoFilme deve retornar um elemento de lista com as informações do filme", () => {

        const elemento = criaCartaoFilme(mockParaTeste.itens[0]);
        expect(elemento).toBeDefined();
        expect(elemento.querySelector("h2").textContent).toBe(mockParaTeste.itens[0].title);
        expect(elemento.querySelector("p").textContent).toBe(`| ${mockParaTeste.itens[0].release_date.split("-")[0]} |`);
        expect(elemento.querySelector("img").src).toBe(`https://image.tmdb.org/t/p/w300/${mockParaTeste.itens[0].poster_path}`);
    });
    
    test("renderizarFilmes deve chamar buscaListaFilmes e renderizar os filmes retornados", async () => {

        buscaListaFilmes.mockResolvedValue(mockParaTeste.itens);
        document.body.innerHTML = '<div id="receberDados"></div>';

        await renderizarFilmes();

        expect(buscaListaFilmes).toHaveBeenCalled();
        expect(document.querySelector(".infosApp")).toBeDefined();
    });

    test ("redenrizarFilmes deve lidar com erros ao chamar buscaListaFilmes", async () => {

        buscaListaFilmes.mockRejectedValue();
        document.body.innerHTML = '<div id="receberDados"></div>';

        await renderizarFilmes();
        expect(buscaListaFilmes).toHaveBeenCalled();
        expect(document.querySelector(".erroApp")).toBeDefined();

});

});