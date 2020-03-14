
var movies;
document.addEventListener('DOMContentLoaded', function() { 
   
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
    document.getElementById('search-form').addEventListener('submit', function(e){
    e.preventDefault();
        var searchString = document.getElementById('search-bar').value;
        var urlEncodedSearchString = encodeURIComponent(searchString); 
        axios.get("http://www.omdbapi.com/?apikey=5bfa8678&s=" + urlEncodedSearchString).then(function(response){
            debugger
            var movieHTML = renderMovies(response.data.Search);
            moviesContainer.innerHTML = movieHTML;
            movies = response.data.Search
            console.log(response.data);
        })
    moviesContainer.innerHTML = renderMovies(movieData);
   })
   
 

});

    function saveToWatchlist(imdbID){
        var movie = movies.find(function(currentMovie){
            return currentMovie.imdbID == imdbID;
               });
            var watchlistJSON = localStorage.getItem('watchlist');
            var watchlist = JSON.parse(watchlistJSON);
            if(watchlist === null) {
                var watchlist = [];
            }
                watchlist.push(movie);
                watchlistJSON = JSON.stringify(watchlist);
                localStorage.setItem('watchlist', watchlistJSON);     
    }