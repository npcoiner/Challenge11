const notes = require('express').Router();
//helpers not being used anywhere else so it's okay to put it here for now
const util = require('util');
const fs = require('fs');


const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
);
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text} = req.body;
  
    if (req.body) {
        const newPost = {
            title,
            text
        };
  
        readAndAppend(newPost, './db/db.json');
        res.json(`Data added successfully 🚀`);
    } else {
        res.error('Error in adding data');
    }
});

module.exports = notes;
