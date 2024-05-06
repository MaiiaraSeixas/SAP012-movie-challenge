import { buscaListaFilmes } from "../test/API.js";

// A função 'criaCartaoFilme' cria um cartão de filme individual.
// Isso é um exemplo de uma função com parâmetros e retorno.
// A função criaCartaoFilme é definida com parâmetro filme e retorna um elemento HTML representando um cartão de filme.
const criaCartaoFilme = (filme) => {
  // Desestrutura o objeto do filme para obter título, data de lançamento, caminho do poster e id.
  // Isso é um exemplo de uso de objetos e desestruturação.
  // As variáveis são declaradas e atribuídas 
  // A desestruturação de objetos é utilizada para extrair propriedades do objeto filme:
  const { title, release_date, poster_path, id } = filme;

  // Extrai o ano de lançamento do filme.
  // As variáveis são declaradas e atribuídas 
  const anoLancamento = release_date.split('-')[0];

  // Constrói o caminho do poster do filme.
  // As variáveis são declaradas e atribuídas 
  const caminhoPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  // Cria um elemento de lista (li) e adiciona a classe 'infosApp'.
  // Isso é um exemplo de manipulação dinâmica de DOM.
  const itemLista = document.createElement('li');
  itemLista.classList.add('infosApp');

  // Cria um link (a) e define seu href para o id do filme.
  const link = document.createElement('a');
  link.href = `#${id}`;

  // Cria uma imagem (img), adiciona a classe 'capaCards', define seu src para o caminho do poster e seu alt para 'Capa'.
  const imagem = document.createElement('img');
  imagem.classList.add('capaCards');
  imagem.src = caminhoPoster;
  imagem.alt = 'Capa';

  // Cria um cabeçalho (h2) e define seu texto para o título do filme.
  const cabecalho = document.createElement('h2');
  cabecalho.textContent = title;

  // Cria um parágrafo (p) e define seu texto para o ano de lançamento do filme.
  const paragrafo = document.createElement('p');
  paragrafo.textContent = `| ${anoLancamento} |`;

  // Adiciona a imagem ao link e todos os elementos ao item da lista.
  link.appendChild(imagem);
  itemLista.appendChild(link);
  itemLista.appendChild(cabecalho);
  itemLista.appendChild(paragrafo);

  // Retorna o item da lista.
  return itemLista;
};

// A função 'criaListaFilmes' cria uma lista de cartões de filme.
// A função criaListaFilmes é definida como assíncrona e retorna uma promessa, envolvendo a chamada à API para buscar a lista de filmes.
// Isso é um exemplo de uma função assíncrona que usa a Web API 'fetch' para buscar dados de filmes de uma API externa.
const criaListaFilmes = async () => {
  // Busca a lista de filmes usando a função 'buscaListaFilmes'.
  const filmes = await buscaListaFilmes();
  const lista = document.createDocumentFragment(); // Use DocumentFragment em vez de um elemento ul
  // Um laço de iteração forEach é utilizado para iterar sobre a lista de filmes retornada pela API
  // A iteração sobre o array de filmes é realizada usando o método forEach
  // Itera sobre a lista de filmes e cria um cartão para cada filme.
  // Isso é um exemplo de uso de laços (forEach).
  filmes.forEach(filme => {
    const cartao = criaCartaoFilme(filme);
    lista.appendChild(cartao);
  });
  return lista;
};

const App = () => {
  // Cria um elemento div e adiciona a classe 'App'.
  const el = document.createElement('div');
  el.className = 'App';

  // Adiciona a lista de filmes ao elemento principal.
  criaListaFilmes().then(lista => {
    el.appendChild(lista);
  });

  return el;
};

export default App;
