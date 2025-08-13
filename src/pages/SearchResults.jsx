// // SearchResults.jsx
// import { useLocation } from "react-router-dom";
// import { BACKEND_URL } from "../constants/constant";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function SearchResults() {
//   const location = useLocation();
//   const data = location.state || [];

//   if (!data.length) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center text-gray-500 text-lg">
//         No results found.
//       </div>
//     );
//   }

//   const addToFav =async(movie)=>{

   
//         try {
//           const res = await axios.put(
//             `${BACKEND_URL}/addtofav`,
//             movie, // send entire movie object
//             {
//               withCredentials: true,
//             }
//           );
//           toast.success(res.data?.message || "Added to favourites!");
//         } catch (err) {
//           console.error("Error adding to favourites:", err);
//           toast.error(
//             err.response?.data?.message || "Failed to add to favourites."
//           );
        
//       };
//   }


//   const handleAddToWatchList = async (movie) => {
//     try {
//       const res = await axios.put(
//         `${BACKEND_URL}/addtowatch`,
//         movie, // send entire movie object
//         {
//           withCredentials: true,
//         }
//       );
//       toast.success(res.data?.message || "Added to WatchList!");
//     } catch (err) {
//       console.error("Error adding to WatchList:", err);
//       toast.error(
//         err.response?.data?.message || "Failed to add to WatchList."
//       );
//     }
//   };


//   return (
//     <div className="min-h-[70vh] bg-gray-50 py-8 px-4">
//       <h1 className="text-3xl font-bold text-center mb-8">
//         Search Results ({data.length})
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//               alt={item.title || item.name}
//               className="w-full h-72 object-cover"
//             />
//             <div className="p-4 flex flex-col flex-grow">
//               <h2 className="text-lg font-semibold mb-2">
//                 {item.title || item.name}
//               </h2>
//               <p className="text-sm text-gray-600 flex-grow line-clamp-4">
//                 {item.overview}
//               </p>
//               <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
//                 <span>
//                   ⭐ {item.vote_average?.toFixed(1)} ({item.vote_count})
//                 </span>
//                 {item.release_date && (
//                   <span>{item.release_date}</span>
//                 )}
//                 {item.first_air_date && (
//                   <span>{item.first_air_date}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 mt-4">
//         <button
//           onClick={()=>addToFav(item)}
//           className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
//         >
//           ❤️ Add to Favourites
//         </button>
//         <button
//           onClick={()=>handleAddToWatchList(item)}
//           className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded"
//         >
//           📌 Add to Watchlist
//         </button>
//         <button
//         //   onClick={watchNow}
//           className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
//         >
//           ▶ Watch Now
//         </button>
//       </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// SearchResults.jsx
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../constants/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SearchResults() {
  const location = useLocation();
  const data = location.state || [];

  const [videos, setVideos] = useState([]);
  const [activeVideoKey, setActiveVideoKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTFlYTUzMjQ0ZjRkZDA2YmVlYTYwYjllMTZjNWVhOSIsIm5iZiI6MTc1NDgyNzI0OC40MDIsInN1YiI6IjY4OTg4OWYwMjYyNjQ4MTY1OThlYTlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0j0xeKJDcKUOV4G4pwv_aua85i42--r5-qxTXmJUag0",
    },
  };

  if (!data.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500 text-lg">
        No results found.
      </div>
    );
  }

  const addToFav = async (movie) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/addtofav`,
        movie,
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Added to favourites!");
    } catch (err) {
      console.error("Error adding to favourites:", err);
      toast.error(err.response?.data?.message || "Failed to add to favourites.");
    }
  };

  const handleAddToWatchList = async (movie) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/addtowatch`,
        movie,
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Added to WatchList!");
    } catch (err) {
      console.error("Error adding to WatchList:", err);
      toast.error(err.response?.data?.message || "Failed to add to WatchList.");
    }
  };

  const handleWatchNow = async (movie) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${movie.media_type || "movie"}/${movie.id}/videos?language=en-US`,
       options
      );
      const fetchedVideos = res.data.results || [];
      setVideos(fetchedVideos);

      const trailer = fetchedVideos.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      const fallback = fetchedVideos.find((vid) => vid.site === "YouTube");
      const videoKey = trailer?.key || fallback?.key;

      if (videoKey) {
        setActiveVideoKey(videoKey);
        setModalOpen(true);
      } else {
        toast.info("No trailer available for this title.");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      toast.error("Failed to load trailer.");
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Search Results ({data.length})
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-[100%] h-72 object-cover h-auto "
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">
                {item.title || item.name}
              </h2>
              <p className="text-sm text-gray-600 flex-grow line-clamp-4">
                {item.overview}
              </p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>
                  ⭐ {item.vote_average?.toFixed(1)} ({item.vote_count})
                </span>
                {item.release_date && <span>{item.release_date}</span>}
                {item.first_air_date && <span>{item.first_air_date}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 px-4 pb-4">
              <button
                onClick={() => addToFav(item)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                ❤️ Add to Favourites
              </button>
              <button
                onClick={() => handleAddToWatchList(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              >
                📌 Add to Watchlist
              </button>
              <button
                onClick={() => handleWatchNow(item)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                ▶ Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && activeVideoKey && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${activeVideoKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
