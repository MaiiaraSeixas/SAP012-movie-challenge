import { buscaListaFilmes } from "../test/API.js";


export const criaCartaoFilme = (filme) => {

  const { title, release_date, poster_path, id } = filme;

  const anoLancamento = release_date.split('-')[0];

  const caminhoPoster = `https://image.tmdb.org/t/p/w300/${poster_path}`;

  const itemLista = document.createElement('li');

  itemLista.classList.add('infosApp');

  const link = document.createElement('a');

  link.href = `#${id}`;

  const imagem = document.createElement('img');
  imagem.classList.add('capaCards');
  imagem.src = caminhoPoster;
  imagem.alt = 'Capa';

  const cabecalho = document.createElement('h2');
  cabecalho.textContent = title;

  const paragrafo = document.createElement('p');
  paragrafo.textContent = `| ${anoLancamento} |`;
  link.appendChild(imagem);
  itemLista.appendChild(link);
  itemLista.appendChild(cabecalho);
  itemLista.appendChild(paragrafo);

  return itemLista;
};

export async function renderizarFilmes(movieId = null) {

  const elementoRaiz = document.querySelector('#receberDados');

  try {

    const filmes = await buscaListaFilmes();

    const container = document.createElement('div');
    container.className = 'listaFilmes';

    filmes.forEach((filme) => {

      if (!movieId || filme.id === movieId) {

        const cartao = criaCartaoFilme(filme);
        container.appendChild(cartao);
      }
    });

    elementoRaiz.innerHTML = '';
    elementoRaiz.appendChild(container);

  } catch (erro) {
    console.error(erro);
  }
}
