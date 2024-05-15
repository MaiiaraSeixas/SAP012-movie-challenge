import { buscaDetalhesFilme } from "../test/API.js"; 

// Define uma função assíncrona chamada createMovieDetails que recebe um ID de filme
export async function createMovieDetails(movie_id) {
  // O try e o catch são usados para tratar erros
  try {
    // Busca os detalhes do filme usando a função buscaDetalhesFilme
    // A função buscaDetalhesFilme faz uma chamada à API para obter os detalhes do filme
    const filme = await buscaDetalhesFilme(movie_id);
    // Cria um novo elemento de seção para os detalhes do filme
    // Este elemento servirá como contêiner para todos os detalhes do filme
    const detalhesContainer = document.createElement('section');
    detalhesContainer.className = 'detalhes-filme';

    // Cria um novo elemento de div para mostrar os detalhes do filme
    // Este elemento conterá a imagem do poster do filme
    const mostrarDetalhes = document.createElement('div');
    mostrarDetalhes.className = 'mostrar-detalhes';

    // Cria um novo elemento de imagem para o poster do filme
    // Define o atributo 'src' da imagem para o caminho do poster do filme
    // Define o atributo 'alt' da imagem para o título do filme
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    img.alt = filme.title;
    mostrarDetalhes.appendChild(img);

    // Cria um segundo elemento de div para mostrar mais detalhes do filme
    // Este elemento conterá o título, descrição, data de lançamento, gênero, duração, média de votos, popularidade, origem e idioma original do filme
    const mostrarDetalhes2 = document.createElement('div');
    mostrarDetalhes2.className = 'mostrar-detalhes-2';


    const titulo = document.createElement('h2');
    titulo.textContent = filme.title;
    mostrarDetalhes2.appendChild(titulo);

    const descricao = document.createElement('p');
    descricao.textContent = filme.overview;
    mostrarDetalhes2.appendChild(descricao);

    const dataLancamento = document.createElement('p');
    dataLancamento.textContent = `Data de Lançamento: ${filme.release_date}`;
    mostrarDetalhes2.appendChild(dataLancamento);

    const genero = document.createElement('p');
    genero.textContent = `Gênero: ${filme.genres.map((genre) => genre.name).join(', ')}`;
    mostrarDetalhes2.appendChild(genero);

    const duracao = document.createElement('p');
    duracao.textContent = `Duração: ${filme.runtime} minutos`;
    mostrarDetalhes2.appendChild(duracao);

    const mediaVotos = document.createElement('p');
    mediaVotos.textContent = `Media de votos: ${filme.vote_average}`;
    mostrarDetalhes2.appendChild(mediaVotos);

    const popularidade = document.createElement('p');
    popularidade.textContent = `Popularidade: ${filme.popularity}`;
    mostrarDetalhes2.appendChild(popularidade);

    const origem = document.createElement('p');
    origem.textContent = `Origem: ${filme.original_language}`;
    mostrarDetalhes2.appendChild(origem);

    const idiomaOriginal = document.createElement('p');
    idiomaOriginal.textContent = `Idioma original: ${filme.original_language}`;
    mostrarDetalhes2.appendChild(idiomaOriginal);

    // Criação do botão de retorno
    // Cria um botão de retorno que, quando clicado, muda a URL para a página inicial
    const botaoRetorno = document.createElement('button');
    botaoRetorno.textContent = 'Voltar';
    botaoRetorno.onclick = function() {
      window.location.href = '/';
    };
    mostrarDetalhes2.appendChild(botaoRetorno);

    // Adiciona os elementos de detalhes ao contêiner de detalhes
    detalhesContainer.appendChild(mostrarDetalhes);
    detalhesContainer.appendChild(mostrarDetalhes2);

    // Retorna o contêiner de detalhes
    return detalhesContainer;
  } catch (err) {

    // Em caso de erro, exibe uma mensagem de erro no console e retorna null
    console.error('Ocorreu um erro ao buscar os detalhes do filme:', err);
    return null;
  }
}

// Define uma função assíncrona chamada renderizarDetalhes que recebe um ID de filme
export async function renderizarDetalhes(movie_id) {

  // Seleciona o elemento com id 'receberDados'
  // Este elemento servirá como o contêiner raiz para os detalhes do filme
  const elementoRaiz = document.querySelector('#receberDados');

// Converte o ID do filme para uma string
// Este ID será passado como parâmetro na função createMovieDetails
// Cria uma função assíncrona chamada createMovieDetails que recebe um ID de filme
const idFilme = `${movie_id}`;

  // Verifica se houve um ID de filme
  // Se houver um ID de filme, tenta criar e renderizar os detalhes do filme
  if (idFilme) {
    try {
      // Cria os detalhes do filme
      const detalhes = await createMovieDetails(idFilme); 
      // Limpa o conteúdo do elemento raiz e adiciona os detalhes do filme
      elementoRaiz.innerHTML = '';
      elementoRaiz.appendChild(detalhes);
    } catch (erro) {
      // Em caso de erro, registra o erro no console      
      console.error('Erro ao renderizar os detalhes do filme:', erro);
    }
  } else {

  }
}
