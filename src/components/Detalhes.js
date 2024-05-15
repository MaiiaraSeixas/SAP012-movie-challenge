import { buscaDetalhesFilme } from "../test/API.js"; 
import { renderizarFilmes } from "./App.js";

export async function createMovieDetails(movie_id) {
  try {
    const filme = await buscaDetalhesFilme(movie_id);
    const detalhesContainer = document.createElement('section');
    detalhesContainer.className = 'detalhes-filme';

    const mostrarDetalhes = document.createElement('div');
    mostrarDetalhes.className = 'mostrar-detalhes';
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    img.alt = filme.title;
    mostrarDetalhes.appendChild(img);

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
    const botaoRetorno = document.createElement('button');
    botaoRetorno.textContent = 'Voltar';
    botaoRetorno.onclick = function() {
      window.location.href = '/';
    };
    mostrarDetalhes2.appendChild(botaoRetorno);

    detalhesContainer.appendChild(mostrarDetalhes);
    detalhesContainer.appendChild(mostrarDetalhes2);

    return detalhesContainer;
  } catch (err) {
    console.error('Ocorreu um erro ao buscar os detalhes do filme:', err);
    return null;
  }
}

export async function renderizarDetalhes() {
  const elementoRaiz = document.querySelector('#receberDados');

const idFilme = `${movie_id.slice(1)}`;
  
  if (idFilme) {
    try {
      const detalhes = await createMovieDetails(idFilme); 
      elementoRaiz.innerHTML = '';
      elementoRaiz.appendChild(detalhes);
    } catch (erro) {
      console.error('Erro ao renderizar os detalhes do filme:', erro);
    }
  } else {
    // Se não houver ID de filme, renderiza a lista de filmes inicial
    renderizarFilmes(); 
  }
}
