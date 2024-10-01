import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = () => {
    setLoading(true);
    axios
      .get(FEATURED_API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMovies();
  }, []);

//   console.log(movies);

  return (
    <MovieContext.Provider value={{movies, loading}}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
