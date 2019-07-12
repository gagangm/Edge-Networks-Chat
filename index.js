const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const http = app.listen(port)
const io = require('socket.io')(http)

app.use('/styles', express.static(__dirname + '/style'))
app.use(express.static('public'))


io.on('connection', (socket) => {
  io.emit('noOfConnections', Object.keys(io.sockets.connected).length)


  socket.on('disconnect', () => {
      io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
  })



  socket.on('chat-message', (msg) => {
      socket.broadcast.emit('chat-message', msg)
  })
  socket.on('joined', (name) => {
      socket.broadcast.emit('joined', name)
  })
  socket.on('left', (name) => {
      socket.broadcast.emit('left', name)
  })

  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data)
  })
  socket.on('stoptyping', () => {
      socket.broadcast.emit('stoptyping')
  })


})


