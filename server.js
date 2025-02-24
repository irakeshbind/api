const http =require('http');
const app = require('./app')
const server = http.createServer(app)


server.listen(4200,()=>{
    console.log('server is runing')
})