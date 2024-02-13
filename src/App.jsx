

import { useState } from 'react';
import './App.css'
import { Movies } from './components/movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';
import { useCallback } from 'react';



function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300), [getMovies]
    )

  // forma no controlada de manejar inputs
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    // console.log({ query });
    // const { query } = Object.fromEntries(new window.FormData(event.target));
    // console.log({ query });
  }

  const handleChange = (event) => {

    const newQuery = event.target.value;
    // console.log(newQuery);
    if (newQuery.startsWith(' ')) return
    updateSearch(newQuery);
    debounceGetMovies(newQuery)

  }

  const handleCheck = () => {
    setSort(!sort);

  }


  return (
    < div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>

          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wards, The Matrix, etc' />
          <input onChange={handleCheck} type='checkbox' checked={sort} />
          <button disabled={error} type='submit'>Buscar</button>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div >
  )
}

export default App
