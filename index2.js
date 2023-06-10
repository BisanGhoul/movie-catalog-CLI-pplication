const { readFile, writeFile } = require('./handlingFiles');
const { addMovie, updateMovie, deleteMovie, searchMovies, filterMovies } = require('./manageMovies');
const { fetchMovies } = require('./fetchAPIMovies');
const prompt = require('prompt-sync')();


console.log("please wait, the file is loading. this igh take a minute...");


const main = async () => {
    let jsonData = [];
     jsonData = await readFile('movies.json');
 

  let choice;
  do {
    console.log('\nPleas choose an option::');
    console.log('1. Add new movie');
    console.log('2. Update movie details');
    console.log('3. Delete movie');
    console.log('4. Search or Filter movies');
    console.log('5. Fetch movies from API');
    console.log('6. Display all movies in the catalog');

    console.log('7. Exit');

    choice = prompt('Enter your choice (1-7): ');

    switch (choice) {
      case '1':
        addMovie(jsonData);
        break;
      case '2':
        updateMovie(jsonData);

        break;
      case '3':
        deleteMovie(jsonData);
        break;
      case '4':
        searchMovies(jsonData);   
        break;
      case '5':
        await fetchMovies(jsonData);
        break;
        case '6':
            console.log('Movies:');
            console.log(jsonData);
            break;
      case '7':
        console.log('Exiting...');
        break;
      default:
        console.log('Invalid choice!');
        break;
    }

    // Write updated movie catalog to file
    await writeFile('movies.json', JSON.stringify(jsonData, null, 2));
  } while (choice !== '7');
};

// Start the program
main();
