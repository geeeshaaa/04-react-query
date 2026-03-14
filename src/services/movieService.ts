import axios from 'axios';
import type { Movie } from '../types/movie';

//const myKey = import.meta.env.VITE_TMDB_TOKEN;

export interface TMDBResponse{
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

// export default async function fetchMovies  (query: string): Promise<TMDBResponse>  {
//   const { data } = await instance.get<TMDBResponse>('/search/movie', {
//     params: {
//       query,
//       language: 'en-US',
//       include_adult: false,
//     },
//   });
//   return data;
// };

export const fetchMovies = async (query: string): Promise<TMDBResponse> => {
  const { data } = await instance.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      language: 'en-US',
      include_adult: false,
    },
  });
  return data;
};