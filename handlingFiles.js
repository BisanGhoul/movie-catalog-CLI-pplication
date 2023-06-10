const fs = require('fs');

// Read file
const readFile = async (filename) => {
  try {
    const data = await fs.promises.readFile(filename, 'utf-8');
    return JSON.parse(data); // Convert string to JSON
  } catch (err) {
    console.log('Something went wrong while reading the file!');
    console.log(err.message);
    return null;
  }
};

// Write file
const writeFile = async (filename, data) => {
  try {
    await fs.promises.writeFile(filename, data, 'utf-8');
    console.log('File written successfully!');
  } catch (err) {
    console.log('Something went wrong while writing to the file!');
    console.log(err.message);
  }
};

module.exports = {
  readFile,
  writeFile,
};
