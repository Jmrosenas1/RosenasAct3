//Pwede baguhin yung name ng variable

const API_KEY= "1bfdbff05c2698dc917dd28c08d41096";
const BASE_URL= "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL= "http://image.tmdb.org/t/p/w500";

const row = document.querySelector(".row");

const getSingleMovie = async () => {
   //Pang kuha ng id sa url
   const pathName = window.location.href.split("/")[3];
   const movieId = pathName.split("?")[1].split("=")[1];

   let data = [];

   const response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
   const responseData = response.data;
   data = responseData;

   singleMovieTemplate(data);
   console.log(data);
};

const singleMovieTemplate = (data) => {
   row.innerHTML = `
                <a href="index.html">
                back
                </a>
               <h3>${data.title}</h3>
           `;
};

getSingleMovie();
