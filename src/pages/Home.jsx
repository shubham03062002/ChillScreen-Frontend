import HeroSection from "../components/HeroSection";
import MovieSection from "../components/MovieSection";
// const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTFlYTUzMjQ0ZjRkZDA2YmVlYTYwYjllMTZjNWVhOSIsIm5iZiI6MTc1NDgyNzI0OC40MDIsInN1YiI6IjY4OTg4OWYwMjYyNjQ4MTY1OThlYTlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0j0xeKJDcKUOV4G4pwv_aua85i42--r5-qxTXmJUag0",
  },
};

function Home() {
  return (
    <>  
    <HeroSection/>
    <div className="px-6 py-4">
      {/* <h1 className="text-4xl font-extrabold mb-8">🎬 ChillScreen</h1> */}
      <span className="tvshows">
    Movies
      </span> 
      {/* Movies */}
      <MovieSection
        title="Popular Movies"
        fetchUrl={`${BASE_URL}/tv/popular?&language=en-US&page=1`}
        options={options}
      />
      <MovieSection
        title="Now Playing Movies"
        fetchUrl={`${BASE_URL}/movie/now_playing`}
        options = {options}

      />
      <MovieSection
        title="Trending Movies"
        fetchUrl={`${BASE_URL}/trending/movie/day?language=en-US`}
        options={options}
      />

<MovieSection
        title="UpComing Movies"
        fetchUrl={`${BASE_URL}/movie/upcoming`}
        options={options}
      />

<MovieSection
        title="Top Rated Movies"
        fetchUrl={`${BASE_URL}/movie/top_rated`}
        options={options}
      />

     <span className="tvshows">
     TV Shows
      </span> 
      <MovieSection
        title="Popular TV Shows"
        fetchUrl={`${BASE_URL}/tv/popular?language=en-US&page=1 `}
        options={options}
      />
      {/* <MovieSection
        title="Latest TV Shows"
        fetchUrl={`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`}
      /> */}
      <MovieSection
        title="Trending TV Shows"
        fetchUrl={`${BASE_URL}/trending/tv/day?language=en-US`}
        options={options}
      />
      <MovieSection
        title="Airing Today"
        fetchUrl={`${BASE_URL}/tv/airing_today?language=en-US&page=1`}
        options={options}
      />


      <MovieSection
        title="Top Rated TV Shows"
        fetchUrl={`${BASE_URL}/tv/top_rated?language=en-US&page=1`}
        options={options}
      />
    </div>
    </>
  );
}

export default Home;

