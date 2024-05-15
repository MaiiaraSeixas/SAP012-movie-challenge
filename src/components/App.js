import { buscaListaFilmes } from "../test/API.js";

// Define uma função chamada criaCartaoFilme que recebe um objeto 'filme' como parâmetro
export const criaCartaoFilme = (filme) => {

  // JavaScript: Variáveis (declaração, atribuição, escopo)
  // JavaScript: Tipos de dados
  // JavaScript: Diferenciar entre tipos de dados primitivos e não primitivos
  // Desestruturação de objeto para extrair campos do objeto 'filme'
  const { title, release_date, poster_path, id } = filme;

  // Manipulação dinâmica de DOM: Criação de uma string para o caminho do poster do filme
  const anoLancamento = release_date.split('-')[0];

  // Manipulação dinâmica de DOM: Criação de uma string para o caminho do poster do filme
  const caminhoPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  // Manipulação dinâmica de DOM: Criação de um novo elemento de lista
  const itemLista = document.createElement('li');

  // Manipulação dinâmica de DOM: Adição de classe ao elemento de lista
  itemLista.classList.add('infosApp');

  // Manipulação dinâmica de DOM: Criação de um novo elemento de link
  const link = document.createElement('a');

  // Manipulação dinâmica de DOM: Definição do atributo 'href' do link
  link.href = `#${id}`;

  // Manipulação dinâmica de DOM: Criação de um novo elemento de imagem
  const imagem = document.createElement('img');

  // Manipulação dinâmica de DOM: Adição de classe à imagem
  imagem.classList.add('capaCards');

  // Manipulação dinâmica de DOM: Definição do atributo 'src' da imagem
  imagem.src = caminhoPoster;

  // Manipulação dinâmica de DOM: Definição do atributo 'alt' da imagem
  imagem.alt = 'Capa';

  // Manipulação dinâmica de DOM: Criação de um novo elemento de cabeçalho
  const cabecalho = document.createElement('h2');

  // Manipulação dinâmica de DOM: Definição do texto do cabeçalho
  cabecalho.textContent = title;

  // Manipulação dinâmica de DOM: Criação de um novo elemento de parágrafo
  const paragrafo = document.createElement('p');

  // Manipulação dinâmica de DOM: Definição do texto do parágrafo
  paragrafo.textContent = `| ${anoLancamento} |`;

  // Manipulação dinâmica de DOM: Adição da imagem como filho do link
  link.appendChild(imagem);

  // Manipulação dinâmica de DOM: Adição do link como filho do item de lista
  itemLista.appendChild(link);

  // Manipulação dinâmica de DOM: Adição do cabeçalho como filho do item de lista
  itemLista.appendChild(cabecalho);

  // Manipulação dinâmica de DOM: Adição do parágrafo como filho do item de lista
  itemLista.appendChild(paragrafo);

  // Retorna o item de lista montado
  return itemLista;
};

// Define uma função assíncrona chamada renderizarFilmes que recebe um parâmetro opcional 'movieId'
export async function renderizarFilmes(movieId = null) {

  // Uso de seletores de DOM: Seleciona o elemento com id 'receberDados' na árvore do DOM
  const elementoRaiz = document.querySelector('#receberDados');

  // Web APIs: Aguarda a obtenção da lista de filmes usando a função buscaListaFilmes
  try {
    const filmes = await buscaListaFilmes();

    // Manipulação dinâmica de DOM: Criação de um novo contêiner de div para os cartões de filme
    const container = document.createElement('div');

    // JavaScript: Uso de laços (while, for, for..of)
    // Itera sobre cada filme na lista de filmes
    filmes.forEach((filme) => {

      // JavaScript: Uso de condicionais (if-else, switch, operador ternário, lógica booleana)
      // Verifica se não há 'movieId' especificado ou se o id do filme é igual ao 'movieId' especificado
      if (!movieId || filme.id === movieId) {

        // Chama a função criaCartaoFilme para criar um cartão de filme para o filme atual
        const cartao = criaCartaoFilme(filme);

        // Manipulação dinâmica de DOM: Adiciona o cartão ao contêiner
        container.appendChild(cartao);
      }
    });
    
    // Manipulação dinâmica de DOM: Limpa o conteúdo do elemento raiz
    elementoRaiz.innerHTML = '';
    // Manipulação dinâmica de DOM: Adiciona o contêiner de cartões de filme ao elemento raiz
    elementoRaiz.appendChild(container);

  } catch (erro) {
    // Manipulação dinâmica de DOM: Em caso de erro, registra o erro no console
    console.error(erro);
  }
}
