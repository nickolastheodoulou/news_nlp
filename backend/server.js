
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var request = require('request');

const today = new Date();
const dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

app.get('/getnews', (req, res) => {

  request(`http://newsapi.org/v2/${req.query.newsType}?language=${req.query.language}&country=${req.query.country}&q=${req.query.q}&category=${req.query.category}&pageSize=10&page=${req.query.pageNumber}&from=${dateToday}&sortBy=publishedAt&apiKey=1c3ed04ce9914eebb242b09bd5fbf836`, function (error, response, body) {
    res.send(body)

  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

