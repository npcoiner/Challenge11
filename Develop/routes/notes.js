const notes = require('express').Router();
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

  
module.exports = notes;
