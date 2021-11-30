const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const ip = require('ip');
const port = 3126;
const ipadrr = ip.address() + ':' + port;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

// external files
var synthesizeText = require('./synthesizeText');
//var soundFiles = require('./soundFiles');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'pub')));
//app.disable('view cache');

app.get('/', function(req, res) {
  var sounds = [
    { name: 'No.mp3', description: 'No' },
    { name: 'Yes.mp3', description: 'Yes' },
    { name: 'Ok.mp3', description: 'Ok' }];
  const directoryPath = path.join(__dirname, 'pub');
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if (file.substr(-3,3) == 'mp3')
            console.log(file); 
    });
  });
  res.render('index', { ipadd : ipadrr, sounds : sounds });
});

app.get('/sound', function(req, res) {
  res.render('sound', { ipadd : ipadrr });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function (socket) {
  socket.emit('connect', { connected: 'yes' });
  socket.on('speech-text', function (data) {
    synthesizeText(data.speechData);
    console.log(data.speechData);
  });
});

server.listen(port);
console.log(port + ' is the magic port');