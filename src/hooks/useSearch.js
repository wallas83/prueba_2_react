import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export function useSearch() {
    const [search, updateSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstinput = useRef(true);
    
    useEffect(() => {
  
      if (isFirstinput.current) {
        isFirstinput.current = search === '';
        return
      }
      if (search === '') {
        setError('No se puede buscar una pelicula vacia');
        return
      }
      if (search.match(/^\d+$/)) {
        setError('No se puede buscar una pelicula con un numero');
        return
      }
      if (search.length < 3) {
        setError('La busqueda debe tener al menos tres caracteres');
        return
      }
  
      setError(null);
    }, [search])
  
    return { search, updateSearch, error }
  }