const prompt = require('prompt-sync')();
const { writeFile } = require('./handlingFiles');


// Add new movie
const addMovie = (movies) => {
    const newMovie = {
        id: prompt('Enter the ID: '),
        title: prompt('Enter the title: '),
        director: prompt('Enter the director: '),
        year: parseInt(prompt('Enter the release year: ')),
        genre: prompt('Enter the genre: '),
      };
    movies.push(newMovie);
  };
  
  // Update movie details
  const searchMovies = async (movies) => {
console.log("===============================================================================");
    console.log('\nSearch and Filter Options:');
    console.log('1. Search by Title');
    console.log('2. Search by Director');
    console.log('3. Search by Genre');
    console.log('4. Filter by Genre');
    console.log('5. Filter by Release Year');
    console.log('6. Exit');
  
    const choice = prompt('Enter your choice (1-6): ');
    console.log();
  
    switch (choice) {
      case '1':
        const titleQuery = prompt('Enter the title to search for: ');
        const moviesByTitle = movies.filter((movie) =>
          movie.title.toLowerCase().includes(titleQuery.toLowerCase())
        );
        console.log('Movies found by title:');
        console.log(moviesByTitle);
        break;
      case '2':
        const directorQuery = prompt('Enter the director to search for: ');
        const moviesByDirector = movies.filter((movie) =>
          movie.director.toLowerCase()===(directorQuery.toLowerCase())
        );
        console.log('Movies found by director:');
        console.log(moviesByDirector);
        break;
      case '3':
        const genreQuery = prompt('Enter the genre to search for: ');
        const moviesByGenre = movies.filter((movie) =>
          movie.genre.toLowerCase().includes(genreQuery.toLowerCase())
        );
        console.log('Movies found by genre:');
        console.log(moviesByGenre);
        break;
      case '4':
        const filterGenre = prompt('Enter the genre to filter by: ');
        const filteredByGenre = movies.filter((movie) =>
          movie.genre.toLowerCase() === filterGenre.toLowerCase()
        );
        console.log('Movies filtered by genre:');
        console.log(filteredByGenre);
        break;
      case '5':
        const filterYear = prompt('Enter the release year to filter by: ');
        const filteredByYear = movies.filter((movie) =>
          movie.year === parseInt(filterYear)
        );
        console.log('Movies filtered by release year:');
        console.log(filteredByYear);
        break;
      case '6':
        console.log('Exiting...');
        return;
      default:
        console.log('Invalid choice!');
        break;
    }
  
    // Call the searchAndFilter function recursively to allow multiple operations
    await searchMovies(movies);
  };


//     movies[movieIndex] = updatedMovie;
//   };
  
  // Delete movie
  const deleteMovie = (movies) => {
    
    const id = prompt('Enter the ID of the movie you want to delete: ');
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      console.log('Movie not found!');
      return;
    }
  
    const deletedMovie = movies.splice(movieIndex, 1)[0];
  
    try {
      writeFile('movies.json', JSON.stringify(movies, null, 2), 'utf-8');
      console.log(`Movie '${deletedMovie.title}' deleted successfully!`);
    } catch (err) {
      console.log('Something went wrong while writing to the file!');
      console.log(err.message);
    }
  };
  
  const updateMovie = async (movies) => {


    const id = prompt('Enter the ID of the movie you want to update: ');
    const movieToUpdate = movies.find((movie) => movie.id === id);
    if (!movieToUpdate) {
      console.log('Movie not found!');
      return;
    }
  
    console.log('details of the movie:');
    console.log(movieToUpdate);
  
    console.log(`
    Which attribute do you want to update? (1-4)
     1) title
     2) director
     3) year
     4) genre
     `);
     const attribute = prompt();
    switch (attribute) {
      case '1':
        const newTitle = prompt('Enter the new title: ');
        movieToUpdate.title = newTitle;
        break;
      case '2':
        const newDirector = prompt('Enter the new director: ');
        movieToUpdate.director = newDirector;
        break;
      case '3':
        const newYear = prompt('Enter the new release year: ');
        movieToUpdate.year = parseInt(newYear);
        break;
      case '4':
        const newGenre = prompt('Enter the new genre: ');1

        movieToUpdate.genre = newGenre;
        break;
      default:
        console.log('Invalid attribute selected!');
        return;
    }
  
    try {

        writeFile('movies.json', JSON.stringify(movies, null, 2));
      console.log('Movie details updated successfully!'+JSON.stringify(movies, null, 2));
    } catch (err) {
      console.log('Something went wrong while writing to the file!');
      console.log(err.message);
    }
  };
  

  
  module.exports = {
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
  };
  