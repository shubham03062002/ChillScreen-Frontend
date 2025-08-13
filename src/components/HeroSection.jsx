import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants/constant";

export default function HeroSection() {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTFlYTUzMjQ0ZjRkZDA2YmVlYTYwYjllMTZjNWVhOSIsIm5iZiI6MTc1NDgyNzI0OC40MDIsInN1YiI6IjY4OTg4OWYwMjYyNjQ4MTY1OThlYTlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0j0xeKJDcKUOV4G4pwv_aua85i42--r5-qxTXmJUag0",
    },
  };

  const handleAddToFavourites = async (movie) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/addtofav`, movie, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "Added to favourites!");
    } catch (err) {
      console.error("Error adding to favourites:", err);
      toast.error(
        err.response?.data?.message || "Failed to add to favourites."
      );
    }
  };

  const handleAddToWatchList = async (movie) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/addtowatch`, movie, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "Added to WatchList!");
    } catch (err) {
      console.error("Error adding to WatchList:", err);
      toast.error(err.response?.data?.message || "Failed to add to WatchList.");
    }
  };

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);

        const videosRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=en-US`,
          options
        );
        const trailer =
          videosRes.data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) || videosRes.data.results.find((v) => v.site === "YouTube");

        setVideoKey(trailer ? trailer.key : "");
      } catch (err) {
        console.error("Error fetching random movie:", err);
      }
    };

    fetchRandomMovie();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchTerm
        )}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (res.data.results.length > 0) {
        navigate(`/searchresult/`, { state: res.data.results });
      } else {
        toast.error("No Results found");
      }
    } catch (err) {
      console.error("Error searching movies:", err);
    } finally {
      setSearchTerm("");
    }
  };

  if (!movie || !videoKey) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="relative h-screen w-full text-white overflow-hidden">
      {/* Background Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=1`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; fullscreen; encrypted-media"
      ></iframe>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between h-full px-6 lg:px-10 py-8 gap-8 lg:gap-0">
        {/* Left: Movie Info */}
        <div className="max-w-xl space-y-4 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {movie.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-200 line-clamp-4 sm:line-clamp-none">
            {movie.overview}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              className="px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 transition transform hover:scale-105 text-sm sm:text-base"
              onClick={() =>
                navigate(`/browse/${movie.id}`, {
                  state: movie,
                })
              }
            >
              ▶ Watch Now
            </button>
            <button
              className="px-5 py-3 rounded-lg bg-pink-400 hover:bg-pink-500 transition transform hover:scale-105 text-sm sm:text-base"
              onClick={() => handleAddToFavourites(movie)}
            >
              ❤️ Add to Favourites
            </button>
            <button
              className="px-5 py-3 rounded-lg bg-pink-300 hover:bg-pink-400 transition transform hover:scale-105 text-sm sm:text-base"
              onClick={() => handleAddToWatchList(movie)}
            >
              + Add to Watchlist
            </button>
          </div>
        </div>

        {/* Right: Search */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-full p-2 flex items-center shadow-lg w-full max-w-sm sm:max-w-md"
        >
          <input
            type="text"
            placeholder="Search movies, TV shows and more..."
            className="px-4 py-2 rounded-full text-black focus:outline-none flex-grow text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-white ml-2 text-sm sm:text-base"
          >
            🔍
          </button>
        </form>
      </div>
    </div>
  );
}
