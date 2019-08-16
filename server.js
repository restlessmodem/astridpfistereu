const express = require('express');
const data = require('./data.json');
const app = express();
const server = app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

app.get('/', (req, res) => {
    res.render('index', {
        data: data.category
    });
});

app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));