const express = require('express');
const compression = require('compression')
const data = require('./data.json');
const app = express();
const server = app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

app.disable('x-powered-by'); // Disable express x-powered-by header

// Compress all responses if no x-no-compression header set
app.use(compression({ filter: function (req, res) {
    if (req.headers['x-no-compression']) {
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
  } 
}))
 
// If request is not https or contains www then reroute
app.use(function(req,resp,next){
    if (req.headers['x-forwarded-proto'] == 'http' || req.headers.host.includes("www.")) {
        return resp.redirect(301, 'https://' + req.headers.host.replace("www.", "") + '/');
    } else {
        return next();
    }
});

// render pug view on root
app.get('/', (req, res) => {
    res.render('index', {
        data: data.category
    });
});

app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));