const http = require('http');
const fs = require('fs').promises; //fs로 파일 읽어오기

const server = http.createServer(async(req,res)=>{
    try{
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server2.html'); //fs를 이용해 html파일을 읽어 전송
        res.end(data); 
    }catch(err){
        console.error(err);
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        res.end(err.message); 
    }
    
})
    .listen(8080);
server.on('listening',()=>{
    console.log('8080포트에서 서버 대기 중');
})
server.on('error',(err)=>{
    console.error(err);
})


