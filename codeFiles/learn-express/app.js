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
  req.session.name = 'zerocho'; // 세션 등록
  req.sessionID; // 세션 아이디 확인
  req.session.destroy(); // 세션 모두 제거
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({ //express-session
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, //클라이언트에서 쿠키를 확인하지 못함
    secure: false, // https가 아닌 환경에서도 사용할 수 있게 함
  }, //배포 시에는 https를 적용하고 secure도 true로 설정하는 것이 좋음
  name: 'session-cookie',
}));
