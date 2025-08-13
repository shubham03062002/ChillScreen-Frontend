// src/components/Fav.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants/constant";

const Fav = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favourites
  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/getfav`, {
        withCredentials: true,
      });
      setFavourites(data);
      console.log("Fetched favourites:", data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch favourites");
    } finally {
      setLoading(false);
    }
  };

  // Remove favourite
  const removeFavourite = async (movie) => {
    try {
      console.log(movie, "movieid");
      await axios.put(
        `${BACKEND_URL}/rmfav`,
        { id: movie },
        { withCredentials: true }
      );
      toast.success("Removed from favourites");
      setFavourites((prev) => prev.filter((fav) => fav.id !== movie));
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from favourites");
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">My Favourite Movies</h2>
      {console.log("favourite: ", favourites)}
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favourites.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-48 object-cover rounded max-w-full h-auto"
              />
              <h3 className="mt-2 font-semibold truncate">
                {movie.original_title}
              </h3>

              <h5>{movie.overview}</h5>
              <p className="text-sm text-gray-500">
                ⭐ {movie.vote_average?.toFixed(1)} | {movie.release_date}
              </p>
              <button
                onClick={() => removeFavourite(movie.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fav;
