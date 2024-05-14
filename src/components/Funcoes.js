export const filtrofiltrarFilmes = (filmes, genero) => {
    const resultado = filmes.filter((filme) => filme.genre_ids.includes(genero));
    return resultado;
}
export const ordenaFilmes = (filmes, ordem) => {
    if (ordem === 'asc') {
        return [...filmes].sort((a, b) => a.title.localeCompare(b.title));
    } else if (ordem === 'desc') {
        return [...filmes].sort((a, b) => b.title.localeCompare(a.title));
    }
}