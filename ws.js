const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')
const http = require('http');
const tweetsRouter = require('./tweets');
const io = require('socket.io')
const { normalizePort, onError } = require('./helpers')

const myDebug = debug('server:server')
const app = express();
const port = normalizePort(process.env.PORT || '9898')
const server = http.createServer(app);

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

app.use('/tweets', tweetsRouter);
app.use((req, res, next) => { next(createError(404)) })  // catch 404 and forward to error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
})

app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
tweetsRoute(io(server))

