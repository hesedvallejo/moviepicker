'use client';
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './page.css';
import Link from "next/link";

function App() {
  const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=12ca769b1759f4252deab89e8690074c";
  const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=12ca769b1759f4252deab89e8690074c&query=";

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(API_SEARCH + term)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  };

  return (
    <div className="App">
      <div className="search_nav">
        <div className="title">
          <h1>Movie Picker</h1>
          <Link href="/contact">
            <h2 className="contact_link">Support Page</h2>
          </Link>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className="Movies">
        {movies && movies.map((movie) =>
          <MovieCard key={movie.id} {...movie} />
        )}
      </div>
    </div>
  );
}

export default App;
