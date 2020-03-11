document.addEventListener('DOMContentLoaded', function() { 
    var watchlistJSON = localStorage.getItem('watchlist');
    var watchlist = JSON.parse(watchlistJSON);
    console.log(watchlist);
    function renderMovies (movieArray){
       var movieHTML = movieArray.map(function (currentMovie){
            return`
            <div class="movie">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${currentMovie.Poster} alt="poster">
                <div class="card-body">
                  <h5 class="card-title">${currentMovie.Title}</h5>
                  <p class="card-text">${currentMovie.Year}</p>
                  <p class="card-text">${currentMovie.Type}</p>							  
                  <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add Movie</a>
                </div>
              </div>
        </div>        
            `
       }).join(""); 
       return movieHTML; 
    } 
    var moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = renderMovies(watchlist);
});