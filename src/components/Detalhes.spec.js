/**
 * @jest-environment jsdom
 */
import { buscaDetalhesFilme } from "../test/API";
import { createMovieDetails, renderizarDetalhes, } from "./Detalhes";
import { mockParaTeste2 } from "../test/Mock";

// Cria um mock do módulo API.js no diretório test
// A função jest.mock é usada para substituir o módulo API.js por uma versão simulada (mock)
jest.mock("../test/API.js");


// Define uma suíte de testes para "Teste das funções createMovieDetailss"
// A função describe é usada para agrupar testes relacionados em uma "suíte de testes"
describe("Teste das funções createMovieDetailss", () => {

  // Define um teste individual para a funcionalidade createMovieDetails
  // A função it é usada para definir um teste individual dentro da suíte de testes
  it("Testa a funcionalidade createMovieDetails", async () => {

    // A propriedade mockResolvedValue é usada para criar uma promessa que resolve para um valor específico
    // Neste caso, o mock da função buscaDetalhesFilme é configurado para resolver para o primeiro elemento do array esperado
    // Configura o mock da função buscaDetalhesFilme para resolver um valor específico quando chamado
    buscaDetalhesFilme.mockResolvedValue(mockParaTeste2.expected[0]);

    // Chama a função createMovieDetails com o argumento "1"
    createMovieDetails("1");

    // Verifica se a função buscaDetalhesFilme foi chamada durante a execução do teste
    // A função expect é usada para fazer uma asserção sobre um valor específico
    // A propriedade toHaveBeenCalled é usada para verificar se uma função mock foi chamada
    expect(buscaDetalhesFilme).toHaveBeenCalled();

    // A função document.querySelector é usada para selecionar o primeiro elemento que corresponde ao seletor CSS fornecido
    // A propriedade toBeDefined é usada para verificar se o valor não é undefined
    // Verifica se um elemento com a classe .detalhes-filme existe no documento após a execução da função createMovieDetails
    expect(document.querySelector(".detalhes-filme")).toBeDefined();
  });


  // Define um teste individual para a funcionalidade renderizarDetalhes
  it("Testa a funcionalidade renderizarDetalhes", async () => {

    // Chama a função renderizarDetalhes com o argumento "1"
    const div = document.createElement("div");
    div.setAttribute("id", "receberDados");
    document.body.appendChild(div);
    renderizarDetalhes("1");
    
    // Verifica se um elemento com a classe .detalhes-filme existe no documento após a execução da função renderizarDetalhes
    expect(document.querySelector(".detalhes-filme")).toBeDefined();
  });

  // Define um teste individual para a funcionalidade do botão de retorno
  it("Testa a funcionalidade do botaoRetorno", async () => {

    // Mock para `window.location.href`
    // Define uma propriedade no objeto window para mockar `window.location.href`
    Object.defineProperty(window, 'location', {

      // Permite que a propriedade `href` seja modificada
      writable: true,
      // Define o valor da propriedade `href` para '#'
      value: { href: '#1' }
    });

    // Configura o mock da função buscaDetalhesFilme para resolver com o primeiro objeto esperado do mock
    buscaDetalhesFilme.mockResolvedValue(mockParaTeste2.expected[0]);

    // Chama a função createMovieDetails e adiciona o resultado ao corpo do documento
    document.body.appendChild(await createMovieDetails("1"));

    // Seleciona o botão no documento que será testado
    const testeBotao = document.querySelector('button')

    // Simula o clique no botão
    testeBotao.click();

    // Verifica se o redirecionamento aconteceu
    expect(window.location.href).toBe('/');
  });

  it("Testa o console.error na função createMovieDetails em caso de erro", async () => {

    // Cria um espião no console.error. Isso permite que você monitore as chamadas para console.error.
    // A função mockImplementation substitui a implementação original por uma função vazia.
    const consoleErrorEspiao = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Simula um erro ao buscar detalhes do filme. 
    //A função mockRejectedValue faz com que a promessa seja rejeitada com o valor fornecido.
    buscaDetalhesFilme.mockRejectedValue(new Error("Erro ao buscar detalhes do filme"));

    // Chama a função que está sendo testada. A palavra-chave await é usada para esperar a resolução da promessa.
    await createMovieDetails("1");

    // Verifica se o console.error foi chamado com a mensagem de erro correta. 
    // A função toHaveBeenCalledWith verifica se a função foi chamada com os argumentos especificados.
    expect(consoleErrorEspiao).toHaveBeenCalledWith('Ocorreu um erro ao buscar os detalhes do filme:', expect.any(Error));

    // Restaura o console.error para seu comportamento original. 
    // A função mockRestore remove a implementação simulada e restaura a implementação original.
    consoleErrorEspiao.mockRestore();
  });

  it("Testa o console.error na função renderizarDetalhes em caso de erro", async () => {

    // Cria um espião no console.error, semelhante ao primeiro teste.
    const consoleErrorEspiao = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Limpa o corpo do documento para garantir que não haja interferência de outros testes. 
    // Isso é importante para evitar falsos positivos.
    document.body.innerHTML = '';

    // Simula um erro ao buscar detalhes do filme, semelhante ao primeiro teste.
    buscaDetalhesFilme.mockRejectedValue(new Error("Erro ao buscar detalhes do filme"));

    // Chama a função que está sendo testada, semelhante ao primeiro teste.
    await renderizarDetalhes("1");

    // Verifica se o console.error foi chamado com a mensagem de erro correta, semelhante ao primeiro teste.
    expect(consoleErrorEspiao).toHaveBeenCalledWith('Erro ao renderizar os detalhes do filme:', expect.any(Error));

    // Restaura o console.error para seu comportamento original, semelhante ao primeiro teste.
    consoleErrorEspiao.mockRestore();
  });

});
