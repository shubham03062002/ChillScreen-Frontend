import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ For notifications
import { useSelector } from "react-redux"; // ✅ To get logged in user info
import { BACKEND_URL } from "../constants/constant";

export default function Browse() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [similar, setSimilar] = useState([]);
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideoKey, setActiveVideoKey] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTFlYTUzMjQ0ZjRkZDA2YmVlYTYwYjllMTZjNWVhOSIsIm5iZiI6MTc1NDgyNzI0OC40MDIsInN1YiI6IjY4OTg4OWYwMjYyNjQ4MTY1OThlYTlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0j0xeKJDcKUOV4G4pwv_aua85i42--r5-qxTXmJUag0",
    },
  };

  const handleAddToFavourites = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/addtofav`,
        data, // send entire movie object
        {
          withCredentials: true,
        }
      );
      toast.success(res.data?.message || "Added to favourites!");
    } catch (err) {
      console.error("Error adding to favourites:", err);
      toast.error(
        err.response?.data?.message || "Failed to add to favourites."
      );
    }
  };



  const handleAddToWatchList = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/addtowatch`,
        data, // send entire movie object
        {
          withCredentials: true,
        }
      );
      toast.success(res.data?.message || "Added to WatchList!");
    } catch (err) {
      console.error("Error adding to WatchList:", err);
      toast.error(
        err.response?.data?.message || "Failed to add to WatchList."
      );
    }
  };

  useEffect(() => {
    if (!data) return;

    const type = data.media_type || (data.first_air_date ? "tv" : "movie");

    const fetchSimilar = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`,
          options
        );
        setSimilar(res.data.results || []);
      } catch (err) {
        console.error("Error fetching similar content:", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
          options
        );
        setVideos(res.data.results || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchSimilar();
    fetchVideos();
  }, [id, data]);

  const handleWatchNow = () => {
    if (!videos.length) return;

    // Find trailer first
    const trailer = videos.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    // Fallback to first YouTube video if no trailer
    const fallback = videos.find((vid) => vid.site === "YouTube");

    const videoKey = trailer?.key || fallback?.key;
    if (videoKey) {
      setActiveVideoKey(videoKey);
      console.log("videokey is:", videoKey);
      setModalOpen(true);
    }
  };

  if (!data) {
    return <p className="text-center text-pink-400">No movie data found.</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 min-h-screen">
      {/* Main details */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title || data.name}
          className="max-h-[600px] w-auto mx-auto object-contain my-[20px]"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">
            {data.title || data.name}
          </h1>
          <p className="text-sm text-pink-500 mb-4">
            {data.original_name || data.original_title} | Votes:{" "}
            {data.vote_count} | Popularity: {data.popularity}
          </p>
          <p className="text-gray-700 mb-6">{data.overview}</p>
          <p className="text-gray-800 font-semibold">
            Rating: ⭐ {data.vote_average?.toFixed(1)}
          </p>
          <div className="flex gap-4 mt-6 sm:w-full flex-col">
            <button
              onClick={handleWatchNow}
              className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition transform hover:scale-105"
            >
              ▶ Watch Now
            </button >
            <button onClick={handleAddToWatchList} className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 text-white shadow-lg transition transform hover:scale-105">
              + Add to Watchlist
            </button>
            <button
              onClick={handleAddToFavourites}
              className="px-4 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 text-white shadow-lg transition transform hover:scale-105"
            >
              ❤️ Add to Favourites
            </button>
          </div>
        </div>
      </div>

      {/* Modal for playing trailer */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-[90%] max-w-4xl"
            onClick={(e) => e.stopPropagation()} // prevent close on click inside
          >
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${activeVideoKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-[-50px] right-0 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Similar content */}
      {similar.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Similar {data.media_type === "tv" ? "TV Shows" : "Movies"}
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {similar.map((item) => (
              <div
                key={item.id}
                className="min-w-[150px] bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() =>
                  navigate(`/browse/${item.id}`, {
                    state: { ...item, type: item.media_type || "movie" },
                  })
                }
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  className="rounded-t-lg"
                />
                <div className="p-2">
                  <p className="text-sm font-medium truncate">
                    {item.title || item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ⭐ {item.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
