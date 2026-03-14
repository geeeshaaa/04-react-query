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
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

export interface MoviesResponse {
  results: Movie[];
  total_pages: number; 
  total_results: number;
  page: number;
}
export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await instance.get<MoviesResponse>(`/search/movie`, {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data;
};