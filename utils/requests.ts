const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const BASE_LANG = 'ko'
const BASE_REGION = 'KR'

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=99`,
}

export default requests
