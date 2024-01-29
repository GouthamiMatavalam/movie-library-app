import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

//Considered necessary information to populate the data
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function App() {

  const [movies, setMovies] = useState<Movies[]>([]);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {
      api_key: '1bcbd71fd85a1704d859620566e0409b'
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios(options).then((response) => {
      const result = response.data.results;
      setMovies(result);
    }).catch(err => console.log(err));
  }

  const images_api = 'https://image.tmdb.org/t/p/w300'

  //Id is assumed as unique id, considered as key
  return (
    <div className='App'>
      {movies.map((items) => (<div className="movieContainer" key={items.id}>
        <h1>{items.title}</h1>
        {items.poster_path && (
          <img src={images_api + items.poster_path} alt={items.title} />
        )}
        <p>{items.release_date}</p>
      </div>)
      )}
    </div>
  )
}

export default App  