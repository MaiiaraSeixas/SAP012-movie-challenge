/**
 * @jest-environment jsdom
 */
import { buscaDetalhesFilme } from "../test/API";
import { createMovieDetails, renderizarDetalhes, } from "./Detalhes";
import { mockParaTeste2 } from "../test/Mock";

jest.mock("../test/API.js");


describe("Teste das funções createMovieDetailss", () => {

  it("Testa a funcionalidade createMovieDetails", async () => {

    buscaDetalhesFilme.mockResolvedValue(mockParaTeste2.expected[0]);
    createMovieDetails("1");
    expect(buscaDetalhesFilme).toHaveBeenCalled();
    expect(document.querySelector(".detalhes-filme")).toBeDefined();
  });


  it("Testa a funcionalidade renderizarDetalhes", async () => {

    const div = document.createElement("div");
    div.setAttribute("id", "receberDados");
    document.body.appendChild(div);
    renderizarDetalhes("1");
    
    expect(document.querySelector(".detalhes-filme")).toBeDefined();
  });

  it("Testa a funcionalidade do botaoRetorno", async () => {

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '#1' }
    });

    buscaDetalhesFilme.mockResolvedValue(mockParaTeste2.expected[0]);
    document.body.appendChild(await createMovieDetails("1"));
    const testeBotao = document.querySelector('button')
    testeBotao.click();
    expect(window.location.href).toBe('/');
  });

  it("Testa o console.error na função createMovieDetails em caso de erro", async () => {

    const consoleErrorEspiao = jest.spyOn(console, 'error').mockImplementation(() => { });
    buscaDetalhesFilme.mockRejectedValue(new Error("Erro ao buscar detalhes do filme"));

    await createMovieDetails("1");

    expect(consoleErrorEspiao).toHaveBeenCalledWith('Ocorreu um erro ao buscar os detalhes do filme:', expect.any(Error));
    consoleErrorEspiao.mockRestore();
  });

  it("Testa o console.error na função renderizarDetalhes em caso de erro", async () => {

    const consoleErrorEspiao = jest.spyOn(console, 'error').mockImplementation(() => { });
    document.body.innerHTML = '';
    buscaDetalhesFilme.mockRejectedValue(new Error("Erro ao buscar detalhes do filme"));

    await renderizarDetalhes("1");

    expect(consoleErrorEspiao).toHaveBeenCalledWith('Erro ao renderizar os detalhes do filme:', expect.any(Error));
    consoleErrorEspiao.mockRestore();
  });

});
