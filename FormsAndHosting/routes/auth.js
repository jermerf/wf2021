const Router = require('express').Router

const router = Router()

const users = []

router.get('/', function (req, res, next) {
  let token = req.cookies.token
  let user = users.find(el => el.token == token)
  if (user) {
    res.send(`Logged in as '${user.username}'`)
  } else {
    res.send(401)
    res.send(`Bad token`)
  }
})


router.post('/', function (req, res, next) {
  let { username, password } = req.body
  // Make sure all parameters are given
  if (!username || !password) {
    res.status(400)
    res.send(`Required 'username' and 'password'`)
    return
  }
  let user = users.find(el => el.username == username)
  if (!user) {
    res.status(401)
    res.send(`Bad credentials`)
    return
  }
  if (user.password === password) {
    let token = Math.round(Math.random() * 1000000000000)
    user.token = token
    res.cookie('token', token)
    res.send(`Logged in successfully`)
  } else {
    res.status(401)
    res.send(`Bad credentials`)
    return
  }
})

router.post('/register', function (req, res, next) {
  let { username, password } = req.body
  // Make sure all parameters are given
  if (!username || !password) {
    res.status(400)
    res.send(`Required 'username' and 'password'`)
    return
  }
  // Make sure username is available
  if (users.find(el => el.username == username)) {
    res.status(400)
    res.send(`Username '${username}' is taken`)
    return
  }
  users.push({ username, password })
  res.send("Registered successfully")
})

module.exports = router
