import { fetchFromTMDB } from "../service/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    
    if (data && data.results && data.results.length > 0) {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      res.json({ success: true, content: randomMovie });
    } else {
      res.status(404).json({ success: false, message: "No trending movies found" });
    }
  } catch (error) {
    console.error('Error in getTrendingMovie controller:', error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    console.error('Error in getMovieTrailers:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error('Error in getMovieDetails:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.error('Error in getSimilarMovies:', error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in getMoviesByCategory:', error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
