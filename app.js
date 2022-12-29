require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport');
const app = express();
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./routes/auth');
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)

)

const users = [];

app.set('view-engine', 'ejs');
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.render('index.ejs', { name: "he" })
})

app.get('/login', (req, res) => {
    res.render('login.ejs', { message: { error: 'error' } })
})

app.post('/home', passport.authenticate('local', {
    successRedirect: '/home',
    failRedirect: '/login',
    failureFlash: true
}))
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/home', (req, res) => {
    res.render('home.ejs')
})


app.post('/signup', async (req, res) => {
    try {
        const hashPassowrd = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashPassowrd
        })
        res.redirect('/login');
    } catch {
        res.redirect('/signup')
    }
    console.log(users)
})


app.listen(3000, () => {
    console.log('Started Server')
})
