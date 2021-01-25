const http = require('http')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const authRouter = require('./routes/auth')
const port = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)

app.set('port', port)
// view engine setup
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/auth', authRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
  res.status(404)
  res.send("Not found, le sad :(")
})

server.listen(port, () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind)
})