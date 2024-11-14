import React, { createContext, useState, useEffect } from "react";
import cinemaApi from "../cinemaApi";

// Tạo MoviesContext
export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [theaterMovies, setTheaterMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm để fetch danh sách Featured Movies
  const fetchFeaturedMovies = async () => {
    try {
      setLoading(true);
      const response = await cinemaApi.get("/movies");
      const data = response.data;
      setFeaturedMovies(data.slice(0, 3));
      setLoading(false);
    } catch (err) {
      console.error(
        "Fetch Featured Movies Error:",
        err.response ? err.response.data : err.message
      );
      setError(err);
      setLoading(false);
    }
  };

  // Hàm để fetch danh sách Theater Movies
  const fetchTheaterMovies = async () => {
    try {
      setLoading(true);
      const response = await cinemaApi.get("/movies");
      const data = response.data;
      setTheaterMovies(data.slice(3));
      setLoading(false);
    } catch (err) {
      console.error(
        "Fetch Theater Movies Error:",
        err.response ? err.response.data : err.message
      );
      setError(err);
      setLoading(false);
    }
  };

  // useEffect để tự động fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchFeaturedMovies();
    fetchTheaterMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        featuredMovies,
        theaterMovies,
        loading,
        error,
        fetchFeaturedMovies,
        fetchTheaterMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
