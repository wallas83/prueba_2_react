
import { useState } from 'react';
import './App.css'
import { Movies } from './components/movies';
import { useMovies } from './hooks/useMovies';
import { useRef } from 'react';


function App() {
  const { movies } = useMovies();
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const isFirstinput = useRef(true);
  // forma no controlada de manejar inputs
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ query });
    // const { query } = Object.fromEntries(new window.FormData(event.target));
    // console.log({ query });
  }

  const handleChange = (event) => {
   
    const newQuery = event.target.value;
    // console.log(newQuery);
   
    if (newQuery.startsWith(' ')) return
  
    setQuery(newQuery);

    if (isFirstinput.current) {
      isFirstinput.current = newQuery === '';
      return
    }
    if (newQuery === '') {
      setError('No se puede buscar una pelicula vacia');
      return
    }
    if (newQuery.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero');
      return
    }
    if (newQuery.length < 3) {
      setError('La busqueda debe tener al menos tres caracteres');
      return
    }

    setError(null);
  }


  return (
    < div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>

          <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wards, The Matrix, etc' />
          <button disabled={error} type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          <Movies movies={movies} />
        }
      </main>
    </div >
  )
}

export default App
