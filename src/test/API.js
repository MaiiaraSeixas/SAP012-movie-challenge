export const buscaListaFilmes = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=10342';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzUzNmY5ZWY5NmYxNDE3YmExYWI2Y2E1YWMwM2E1NCIsInN1YiI6IjY2MjY3OGZmMmRkYTg5MDE4N2UzY2Y3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGBoJj6mNvddRiSjXLHqte0NxkExEIuii1D3WeAGt8o'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results;
    } catch (err) {
      return 'Ocorreu um erro:' + err;
    }
  };
  
  export const buscaDetalhesFilme = async (movie_id) => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id.slice(1)}?language=pt-BR&with_companies=10342`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzUzNmY5ZWY5NmYxNDE3YmExYWI2Y2E1YWMwM2E1NCIsInN1YiI6IjY2MjY3OGZmMmRkYTg5MDE4N2UzY2Y3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGBoJj6mNvddRiSjXLHqte0NxkExEIuii1D3WeAGt8o'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (err) {
      return 'Ocorreu um erro:' + err;
    }
  };
  


// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzUzNmY5ZWY5NmYxNDE3YmExYWI2Y2E1YWMwM2E1NCIsInN1YiI6IjY2MjY3OGZmMmRkYTg5MDE4N2UzY2Y3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGBoJj6mNvddRiSjXLHqte0NxkExEIuii1D3WeAGt8o'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=10342', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// curl --request GET \
//      --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=10342' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzUzNmY5ZWY5NmYxNDE3YmExYWI2Y2E1YWMwM2E1NCIsInN1YiI6IjY2MjY3OGZmMmRkYTg5MDE4N2UzY2Y3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MGBoJj6mNvddRiSjXLHqte0NxkExEIuii1D3WeAGt8o' \
//      --header 'accept: application/json'
    