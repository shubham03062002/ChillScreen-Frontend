import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MovieSection({ title, fetchUrl, options }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(fetchUrl, options);
        setItems(res.data.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-extrabold mb-4 text-pink-300 drop-shadow-lg">{title}</h2>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <div
          key={item.id}
          onClick={() =>
            navigate(`/browse/${item.id}`, {
              state: { ...item, type: item.media_type || "movie" }
            })
          }
            className="min-w-[150px] rounded-xl shadow-lg hover:scale-110 transform transition duration-300 cursor-pointer bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 p-1"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title || item.name}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
