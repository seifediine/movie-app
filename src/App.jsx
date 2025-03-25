import './App.css'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDA1ZTFhNjljMThhNDZlNzUxMWVmYzYzZGM2NjA5ZCIsIm5iZiI6MTYyMDUxNzE4NC41OTIsInN1YiI6IjYwOTcyMTQwMmIyMTA4MDA0MmFkMTE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qTy9bc-_0g3ZsuZAp40wEhYdKuPQ_5t6JQgj-iUkqJY'

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [movieList, setMovieList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])

      console.log(data)
    } catch (error) {
      console.log(`Error fetching movies ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className='text-white'>
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
