
import responseMovie from '../mocks/with-results.json';
export const useMovies = () => {
    const movies = responseMovie.Search;

    const mappedMovies = movies?.map(movie => (
        {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }
    ))

    return { movies: mappedMovies }
}