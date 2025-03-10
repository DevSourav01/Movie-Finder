import { useEffect, useState } from "react";
import React from "react";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://www.omdbapi.com?apikey=75bd3daf";

  // Function to fetch movies from OMDB API
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
      setSearchTerm('')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch movies when the component loads
  useEffect(() => {
    searchMovies("Mission: Impossible");
    
  }, []);

  return (
    <div className="app">
      <h1>Movie Flex</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          required
          onChange={(e) =>
            setSearchTerm(e.target.value.toLocaleLowerCase().trim())
          }
        />
        <button
          onClick={() => {
            if (searchTerm === "") {
              alert("Enter Movie Name");
            } else {
              searchMovies(searchTerm);
            }
          }}
        >
          Search
        </button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
