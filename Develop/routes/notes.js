const notes = require('express').Router();
//helpers not being used anywhere else so it's okay to put it here for now
const util = require('util');
const fs = require('fs');


const readFromFile = util.promisify(fs.readFile);

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

  
module.exports = notes;
