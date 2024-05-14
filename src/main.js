import { criaCartaoFilme } from './components/App.js';
import { buscaListaFilmes, buscaDetalhesFilme } from './test/API.js';
import { createMovieDetails } from './components/Detalhes.js';
import { ordenaFilmes, filtrofiltrarFilmes } from './components/Funcoes.js';

const filtro = document.querySelector('#filtro');
if (filtro) {
  filtro.addEventListener('change', (event) => {
    console.log(event.target.value);
    filtrofiltrarFilmes(event.target.value);
  });
} else {
  console.error('Elemento #filtro não encontrado');
}

const ordem = document.querySelector('#ordem');
if (ordem) {
  ordem.addEventListener('change', (event) => {
    console.log(event.target.value);
    ordenaFilmes(event.target.value);
  });
} else {
  console.error('Elemento #ordem não encontrado');
}
function renderizarFilmes() { 
  const elementoRaiz = document.querySelector('#receberDados');
  buscaListaFilmes()
    .then(filmes => {
      const container = document.createElement('div');
      filmes.forEach((filme) => {
        const cartao = criaCartaoFilme(filme);
        container.appendChild(cartao);
      });
      elementoRaiz.appendChild(container);
    })
    .catch(erro => console.error(erro)); 
}

async function renderizarDetalhes() {
  const elementoRaiz = document.querySelector('#receberDados');

  const idFilme = window.location.hash;
  console.log(idFilme);
  if (idFilme) {
    try {
      const detalhes = await createMovieDetails(idFilme); 
      elementoRaiz.innerHTML = '';
      elementoRaiz.appendChild(detalhes);
    } catch (erro) {
      console.error('Erro ao renderizar os detalhes do filme:', erro);
    }
  } else {
    renderizarFilmes(); 
  }
}

// renderizarDetalhes();

function lidarComMudancaNoHash() {
  window.addEventListener('hashchange', renderizarDetalhes);
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarDetalhes();
  lidarComMudancaNoHash();
});

function limparERetornar() {
  const containerFilmes = document.getElementById('movies-container');
  containerFilmes.innerHTML = '';

  window.location.href = '/';
}

// const listaFilmes = document.getElementById('receberDados');

// const mudarPagina = (movieId) => {
//     listaFilmes.innerHTML = "";
//     listaFilmes.appendChild(Detalhes(movieId));
// }
// window.addEventListener('load', () => {
//     if(window.location.hash === " ") {
//         listaFilmes.innerHTML = "";
//         listaFilmes.appendChild(App());
//     } else {
//         listaFilmes.innerHTML = "";
//         mudarPagina(window.location.hash.substring(1));
//     }

// });

// const hashDetalhes = () => {
//     window.addEventListener('hashchange', () => {
//         if(window.location.hash === "") {
//             listaFilmes.innerHTML = "";
//             listaFilmes.appendChild(App());
//         } else {
//             listaFilmes.innerHTML = "";
//             mudarPagina(window.location.hash.substring(1));
//         }
//     });
// }

// hashDetalhes();


// document.getElementById('root').appendChild(App());
