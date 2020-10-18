const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var request = require('request');

const today = new Date();
var dateToday = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();


app.get('/getnews', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  request(`http://newsapi.org/v2/${req.query.newsType}?language=${req.query.language}&country=${req.query.country}&q=${req.query.q}&category=${req.query.category}&pageSize=10&page=${req.query.pageNumber}&from=${dateToday}&sortBy=publishedAt&apiKey=1c3ed04ce9914eebb242b09bd5fbf836`, function (error, response, body) {
    res.send(body)

  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

