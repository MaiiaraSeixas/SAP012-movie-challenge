import { buscaListaFilmes } from "../test/API.js";

export const criaCartaoFilme = (filme) => {

  const { title, release_date, poster_path, id } = filme;
  const anoLancamento = release_date.split('-')[0];
  const caminhoPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
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

const criaListaFilmes = async () => {

  const filmes = await buscaListaFilmes();

  const lista = document.createDocumentFragment();

  filmes.forEach(filme => {
    const cartao = criaCartaoFilme(filme);
    lista.appendChild(cartao);
  });
  return lista;
};

const App = () => {
  
  const el = document.createElement('div');
  el.className = 'App';
  criaListaFilmes().then(lista => {
    el.appendChild(lista);
  });
  return el;
};

export default App;
