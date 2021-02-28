const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const tweetsRouter = require('./tweets');
const debug = require('debug')
const http = require('http');
const tweetsRoute = require('./tweets');
const myDebug = debug('server:server')
const io = require('socket.io')
const request = require('request');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000
const server = http.createServer(app)

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  myDebug('Listening on ' + bind);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tweets', tweetsRouter);
app.use((req, res, next) => { next(createError(404)) })  // catch 404 and forward to error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
})

app.get('/getnews', (req, res) => {
  const today = new Date();
  const dateToday = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  request(`http://newsapi.org/v2/${req.query.newsType}?language=${req.query.language}&country=${req.query.country}&q=${req.query.q}&category=${req.query.category}&pageSize=10&page=${req.query.pageNumber}&from=${dateToday}&sortBy=publishedAt&apiKey=1c3ed04ce9914eebb242b09bd5fbf836`, function (error, response, body) {
    res.send(body)
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// app.listen(port, () => { console.log(`Listening on port ${port}`) });

app.set('port', port)
server.on('error', onError);
server.on('listening', onListening);
tweetsRoute(io(server))
server.listen(port);

