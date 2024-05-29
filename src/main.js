import { renderizarFilmes } from './components/App.js';
import { renderizarDetalhes } from './components/Detalhes.js';

// Define uma função chamada lidarComMudancaNoHash
function lidarComMudancaNoHash() {

  // Verifica se existe um ID de filme no hash da URL
  if (getMovieIdFromHash()) {

    // Se existir, renderiza os detalhes desse filme
    renderizarDetalhes(getMovieIdFromHash());

  }
  else {

    // Se não existir, renderiza todos os filmes
    renderizarFilmes();
  }

}
// Adiciona um ouvinte de evento para mudanças no hash da URL
// Quando o hash muda, a função lidarComMudancaNoHash é chamada
window.addEventListener('hashchange', lidarComMudancaNoHash);

// Adiciona um ouvinte de evento para o carregamento do conteúdo do documento
// Quando o conteúdo do documento é carregado, a função renderizarFilmes é chamada
document.addEventListener('DOMContentLoaded', () => {
  renderizarFilmes();
});

// Define uma função chamada getMovieIdFromHash
function getMovieIdFromHash() {

  // Retorna o hash da URL (que é o ID do filme)
  return window.location.hash;
}
