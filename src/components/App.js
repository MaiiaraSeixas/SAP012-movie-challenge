import { buscaListaFilmes } from "../test/API.js";

// Define uma função chamada criaCartaoFilme que recebe um objeto 'filme' como parâmetro
// é uma função de ordem superior que recebe um objeto 'filme' como argumento.
export const criaCartaoFilme = (filme) => {

  // JavaScript: Variáveis (declaração, atribuição, escopo)
  // JavaScript: Tipos de dados
  // JavaScript: Diferenciar entre tipos de dados primitivos e não primitivos
  // Desestruturação de objeto para extrair campos do objeto 'filme'
  // Aqui, estamos usando a desestruturação de objeto, uma característica do ES6, para extrair propriedades específicas do objeto 'filme'
  const { title, release_date, poster_path, id } = filme;

  // Manipulação dinâmica de DOM: Criação de uma string para o caminho do poster do filme
  // O método 'split' é usado para dividir a string 'release_date' em um array de strings. 
  // Estamos interessados apenas no primeiro elemento do array, que é o ano de lançamento.
  const anoLancamento = release_date.split('-')[0];

  // Aqui, estamos construindo dinamicamente o URL do poster do filme usando template strings, outra característica do ES6.
  // Manipulação dinâmica de DOM: Criação de uma string para o caminho do poster do filme
  const caminhoPoster = `https://image.tmdb.org/t/p/w300/${poster_path}`;

  // Manipulação dinâmica de DOM: Criação de um novo elemento de lista
  // Estamos criando elementos DOM dinamicamente usando o método 'createElement' e adicionando classes a eles usando 'classList.add'.
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
  // A função retorna o elemento 'itemLista', que agora contém todos os elementos filhos necessários.
  return itemLista;
};

// Define uma função assíncrona chamada renderizarFilmes que recebe um parâmetro opcional 'movieId'
// 'renderizarFilmes' é uma função assíncrona que renderiza os filmes na página.
// Ela aceita um 'movieId' opcional como argumento. Se nenhum valor for fornecido para 'movieId', 
// seu valor padrão será 'null'. Isso é indicado pela expressão 'movieId = null' na definição da função.
export async function renderizarFilmes(movieId = null) {

  // Uso de seletores de DOM: Seleciona o elemento com id 'receberDados' na árvore do DOM
  const elementoRaiz = document.querySelector('#receberDados');

  // Web APIs: Aguarda a obtenção da lista de filmes usando a função buscaListaFilmes
  // 'buscaListaFilmes' é uma função assíncrona que retorna a lista de filmes.
  // A função 'buscaListaFilmes' retorna uma promessa.
  try {

    // Aqui, estamos usando a palavra-chave 'await' para pausar a execução da função até que a promessa retornada por 'buscaListaFilmes' seja resolvida.
    const filmes = await buscaListaFilmes();

    // Manipulação dinâmica de DOM: Criação de um novo contêiner de div para os cartões de filme
    const container = document.createElement('div');
    container.className = 'listaFilmes';

    // JavaScript: Uso de laços (while, for, for..of)
    // Itera sobre cada filme na lista de filmes
    filmes.forEach((filme) => {

      // JavaScript: Uso de condicionais (if-else, switch, operador ternário, lógica booleana)
      // Verifica se não há 'movieId' especificado ou se o id do filme é igual ao 'movieId' especificado
      // Aqui, estamos verificando se 'movieId' é 'null' (o que significa que nenhum valor foi fornecido para 'movieId')
      // ou se o 'id' do filme atual é igual ao 'movieId' fornecido. Se qualquer uma dessas condições for verdadeira,
      // um cartão de filme será criado para o filme atual.
      // Estamos usando o método 'forEach' para iterar sobre cada filme na lista de filmes.
      if (!movieId || filme.id === movieId) {

        // Chama a função criaCartaoFilme para criar um cartão de filme para o filme atual
        const cartao = criaCartaoFilme(filme);

        // Manipulação dinâmica de DOM: Adiciona o cartão ao contêiner
        container.appendChild(cartao);
      }
    });
    
    // Aqui, estamos limpando o conteúdo do 'elementoRaiz' e anexando o 'container' a ele.
    // Isso é feito para que os cartões de filme sejam renderizados na página.
    // Manipulação dinâmica de DOM: Limpa o conteúdo do elemento raiz
    elementoRaiz.innerHTML = '';
    // Manipulação dinâmica de DOM: Adiciona o contêiner de cartões de filme ao elemento raiz
    elementoRaiz.appendChild(container);

  } catch (erro) {
    // Em caso de erro, estamos registrando o erro no console.
    // Manipulação dinâmica de DOM: Em caso de erro, registra o erro no console
    console.error(erro);
  }
}
