const express = require('express');
const data = require('./data.json');
const app = express();

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server running on port 8080`);
});

app.disable('x-powered-by'); // Disable express x-powered-by header

// render pug view on root
app.get('/', (req, res) => {
    res.render('index', {
        data: data.category
    });
});
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));