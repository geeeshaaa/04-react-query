import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { MovieModal } from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css'

export default function App() {
  const [query, setQuery] =useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const {data, isLoading, isError, error} = useQuery({
  queryKey: ['movies', query, page],
  queryFn: ()=> fetchMovies(query, page),
  enabled: query.length > 0,
  placeholderData: keepPreviousData,
});

useEffect(() => { 
  if (!isLoading && data?.results?.length === 0 && query !== '') {
    toast.error('No movies found for your request.');
  }
}, [data, isLoading, query]);

  const handleSearch = (newQuery: string)=>{  
    setQuery(newQuery);
    setPage(1);
    
  };
  const totalPages = data?.total_pages || 0;

console.log(data);

  return(
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch}/>
      <Toaster position="top-center"/>
      {isLoading && <Loader/>}
      
      {isError && <ErrorMessage  />}
      
      { totalPages > 1 &&(
        <ReactPaginate 
          pageCount={totalPages > 500 ? 500 : totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({selected})=> setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"       
        />
      )}
      {data?.results && data?.results.length > 0 &&(
        <MovieGrid movies={data.results} onSelect={setSelectedMovie}/>
      )}
     
      {selectedMovie && (
        <MovieModal
        movie={selectedMovie}
        onClose={()=> setSelectedMovie(null)}
        />
      )}
    </div>
  )
}
