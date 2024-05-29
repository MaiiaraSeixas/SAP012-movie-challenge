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
    it ("Testa a funcionalidade createMovieDetails", async () => {

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
    it ("Testa a funcionalidade renderizarDetalhes", async () => {

        // Chama a função renderizarDetalhes com o argumento "1"
        
        const div = document.createElement("div");
        div.setAttribute("id", "receberDados");
        document.body.appendChild(div);
        renderizarDetalhes("1");
        // Verifica se um elemento com a classe .detalhes-filme existe no documento após a execução da função renderizarDetalhes
        expect(document.querySelector(".detalhes-filme")).toBeDefined();
    });

    it("Testa a funcionalidade do botaoRetorno", () => {

        // Mock para `window.location.href`
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: '' }
        });

// const div = document.createElement("div");
// div.setAttribute("id", "receberDados");
document.body.appendChild(createMovieDetails("1"));
buscaDetalhesFilme.mockResolvedValue(mockParaTeste2.expected[0]);
const testeBotao = document.querySelector('button')


        // Simula o clique no botão
        testeBotao.click();

        // Verifica se o redirecionamento aconteceu
        expect(window.location.href).toBe('/');
    });
});
