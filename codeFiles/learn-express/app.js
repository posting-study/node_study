const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { encode } = require('punycode');
dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); //morgan

app.use('/', express.static(path.join(__dirname, 'public'))); //static

app.use(cookieParser()); //cookieParser
app.get('/',(req,res,next)=>{
  req.cookies //{mycookie: 'test' }
  req.signedCookies; //서명화된(암호화된)쿠키
  res.cookie('name',encodeURIComponent(name),{
    expires: new Date(),
    httpOnly: true,
    path: '/',
  })
  res.clearCookie('name', encodeURIComponent(name),{ //쿠키 지우기도 간편
    httpOnly: true,
    path: '/',
  })
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));
