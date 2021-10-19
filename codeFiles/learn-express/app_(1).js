const express = require('express');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => { //localhost:3000
  //res.send('Hello, Express');// express에서는 res.write나 res.end 대신 res.send를 사용
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/about', (req, res) => { //localhost:3000/about
  
  res.send("hi about");
});

app.use((req,res,next) => {
  try{
    console.log("성공");
  }catch(error){
    next(error);
  }
})

app.use((err, req, res, next) => { //미들웨어
    console.error(err);
    res.status(500).send("에러");
  });
  
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
