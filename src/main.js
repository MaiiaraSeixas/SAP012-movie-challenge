import { renderizarFilmes } from './components/App.js';
import { renderizarDetalhes } from './components/Detalhes.js';

function lidarComMudancaNoHash() {

  if (getMovieIdFromHash()) {

    renderizarDetalhes(getMovieIdFromHash());

  }
  else {

    renderizarFilmes();
  }

}

window.addEventListener('hashchange', lidarComMudancaNoHash);
document.addEventListener('DOMContentLoaded', () => {
  renderizarFilmes();
});

function getMovieIdFromHash() {

  return window.location.hash;
}
