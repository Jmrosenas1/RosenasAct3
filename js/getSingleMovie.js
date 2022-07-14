//Pwede baguhin yung name ng variable
const API_KEY = "1bfdbff05c2698dc917dd28c08d41096";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/w500";
const row = document.querySelector(".single-page");
const similar_row = document.querySelector(".similar-movies");
const getSingleMovie = async () => {

  //Pang kuha ng id sa url
  const pathName = window.location.href.split("/")[3];
  const movieId = pathName.split("?")[1].split("=")[1];

  let data = [];
  let similar_movie_data = [];

  const response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const similar_movie_response = await axios.get(`${BASE_URL}movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`);
  const responseData = response.data;
  data = responseData;

  const similar_movie_responseData = similar_movie_response;
  similar_movie_data = similar_movie_responseData.data.results;
  console.log(similar_movie_data);

  singleMovieTemplate(data);
  similarMovieTemplate(similar_movie_data);
};

const singleMovieTemplate = (data) => { 
  row.innerHTML = `
  <a href="index.html" class="return-btn">
  Back to Home
  </a>
  <div class="single-container">
  
  <h2>${data.title}</h2>
  <img class="single-img" src="${IMAGE_BASE_URL + data.poster_path}" alt=""/>
  <h4>Overview:</h4>
  <h3>${data.overview}</h3>
  <h4>Vote Average: ${data.vote_average}</h4>
  <h4>Release Date: ${data.release_date}</h4>
  </div>
  `;
};


const similarMovieTemplate = (data) => {
  similar_row.innerHTML = data
    .map((movie) => {return `
   <div>
   <a href="singleMovie.html?movie=${movie.id}" onclick="return false" ondblclick="location=this.href">
   <div class="movie">
   <img  src="${IMAGE_BASE_URL + movie.backdrop_path}" alt="image">

   <div class="movie-info">
   <h3>${movie.title}</h3>
       <span class="green">${movie.vote_average}</span>
   </div>
  <div class="overview">
   <h3> Overview</h3>
  ${movie.overview}
  </div> 
</div>
       
   </a>
   </div>
`;
    })
    .join("");
};
getSingleMovie();
