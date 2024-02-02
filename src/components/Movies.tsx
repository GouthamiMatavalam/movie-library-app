import React from 'react'
import { MoviesWrapper } from '../movies.modules'
import axios from 'axios'
import { discoverEndPoint, searchEndPoint, imageEndpoint, moviesApi } from '../api_links'

//Considered necessary information to populate the data
interface MoviedDetails {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const Movies = () => {

  const [showItems, setShowItems] = React.useState<MoviedDetails[]>([]);

  const [searchQuery, setSearchQuery] = React.useState("")

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchMovies = async () => {
    try {
      const endpoints = searchQuery ? searchEndPoint : discoverEndPoint;
      const response = await axios.get(endpoints,
        {
          params: {
            query: searchQuery,
            page: currentPage
          },
        }
      );

      const { results, total_pages } = response.data;

      //Considered to diplay 6 images in single page
      setShowItems(results.slice(0, 6));
      setTotalPages(total_pages);

      // After receiving response data from TheMovieDB, considered inserting data only once
      let executedOnce: boolean = false;

      const responseObj = JSON.stringify(response.data);

      // Implemented POST call to execute backend API, implemented using Express Js
      if (!executedOnce) {
        executedOnce = true;
        await fetch(moviesApi, {
          method: 'POST',
          body: responseObj,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
      } else {
        console.log('Already executed once !!');
      }
    } catch (error) {
      console.error("Something went wrong, Try Again ,", error);
    }
  }
  React.useEffect(() => {
    fetchMovies()
  })

  // Added Pagination to view all movies, in multiple pages
  const navigatePages = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((next) => next + 1);
    }

  }

  const showAll = () => {
    fetchMovies()
    setCurrentPage(1);
  }

  return (
    <MoviesWrapper>
      <h1>FilmHive</h1>
      <div className="searchBar">
        <input type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }} />
        <button onClick={showAll}>Show All</button>
      </div>
      <div className='movieCard'>
        {showItems.map((items) => {
          return (
            <div className='movie' key={items.id}>
              <div className='movieImg'>
                <img src={imageEndpoint + items.poster_path} alt='img' />
              </div>
              <div className='movieInfo'>
                <h4>{items.title}</h4>
              </div>
            </div>
          )
        })}
      </div>
      <div className='buttons'>
        {currentPage > 1 && (
          <button className='btnPrev' onClick={() => navigatePages('prev')}>
            Back
          </button>
        )}

        <p>Page | {currentPage}</p>

        {currentPage < totalPages && (
          <button className='btnNext' onClick={() => navigatePages('next')}>
            Next
          </button>
        )}
      </div>
    </MoviesWrapper>
  )
}

export default Movies
