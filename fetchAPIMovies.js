const fetch = require('node-fetch');
const { writeFile } = require('./handlingFiles');

// Fetch movies from API
const fetchMovies = async (movies) => {
    console.log("fetching movies from API, please wait this might take a while...");
    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '952132c28emsh7dc55fa9da055c0p1ccdb8jsn3d368f619de1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let newMovie;
        for(let i=1;i<7;i++){
            let element=(result.results[i]);
            newMovie = {
                id: element.id,
                      title: element.titleText.text,
                      year: element.releaseYear.year,
                      director: "someone",
                      genre: "Action",
                    };
                    // console.log(newMovie);
                    movies.push(newMovie);
        }
            //     // Add the new movie to the catalog
        // jsonData.push(newMovie);
  
        // Write the updated movie catalog to the JSON file
        writeFile('movies.json', JSON.stringify(movies, null, 2), 'utf-8');
        console.log(`6 Movies from API were added successfully!`);

    } catch (err) {
      console.log('Something went wrong while making the request!');
      console.log(err);
    }
  };

module.exports = {
  fetchMovies,
};
