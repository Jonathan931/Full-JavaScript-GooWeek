const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  'mongodb://goweek:goweek123@ds143241.mlab.com:43241/goweek-jonathan',
  {
    useNewUrlParser: true
  }
);
app.use((req, res, next) =>{
  req.io = io;
  return next();
})
app.use(cors());
app.use( express.json());
app.use( require('./routes') );

server.listen(3000, () =>{
  console.log('Server started on Port 3000')
});