const express = require('express')
const path = require('path')
const flash = require('connect-flash')

const config = require('./config')

const app = express()

const routerBook = require('./routes/home.routes')
const routerUser = require('./routes/register.routes')
const routerOrder = require('./routes/order.routes')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'assets/uploads')))
app.use(express.json())
app.use(express.urlencoded())

app.use(flash())
app.set('view engine', 'ejs')
app.set('views', 'views')

//

//

//beginSessions
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/library',
  collection: 'sessions',
})

app.use(
  session({
    secret: config.session.secret,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
)

//endSession

app.use('/', routerOrder)
app.use('/', routerUser)
app.use('/', routerBook)

global.year = new Date().getFullYear()
global.storename = 'White Book Store'
global.understorename = 'Programming books only'
global.icon = 'img/icon.png'

app.get('/about', (req, res) => {
  res.render('about', {
    verifuser: req.session.userId,
    namestore: namestore,
    desc: description,
    namefounder: namefounder,
    descfounder: descfounder,
    imgfounder: imgfounder,
    aboutimg: aboutimg,
    aboutimg2: aboutimg2,
    historydesc: historydesc,
  })
})

//generale about info
const namestore = 'white book store'
const description =
  'white book store is the digital store which sell programming books online. We are dedicated to creating “a world enlightened by reading” by selling the industry’s largest catalog of books..'
const namefounder = 'Kessemtini Ayoub'
const descfounder = 'Freelancer and already studing '
const imgfounder = 'img/founder.jpg'
const aboutimg = 'img/aboutimg.jpg'
const aboutimg2 = 'img/aboutimg2.jpg'
const historydesc =
  'white book store founded in dec 2021 , specializes on selling programming books around the world. Our goal is to help people whose need to learn more about programming . We will keep working in these endeavors.'
//

module.exports = app
