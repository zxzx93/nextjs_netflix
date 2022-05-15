const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const BASE_LANG = 'ko'
const BASE_REGION = 'KR'

const requests = {
  AxiosTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`,
  AxiosNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_networks=213`,
  AxiosTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`,
  AxiosActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=28`,
  AxiosComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=35`,
  AxiosHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=27`,
  AxiosRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=10749`,
  AxiosDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${BASE_LANG}&region=${BASE_REGION}&with_genres=99`,
}

export default requests
