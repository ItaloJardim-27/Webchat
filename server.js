const http = require("http");
const fs = require('fs');
const express = require('express');
const app = express();'  '
const server = http.createServer(app); //Servidor http
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000; // port que vai carregar
//const sqlScript = require("./user")
const sql = require('mssql');
const { emit } = require("process");


app.use(express.static('public'));


/*app.get("/", (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });//PRESTAR ATENÇÃO QUE O CONTENT É UMA STRING E O TEXT/HTML É OUTRA
    const html = fs.readFileSync("./index.html");
    res.end(html);
})

app.get("/client.js", (req, res) => {
    res.writeHead(200, { 'content-type': 'application/javascript' });//PRESTAR ATENÇÃO QUE O CONTENT É UMA STRING E O TEXT/HTML É OUTRA
    const html = fs.readFileSync("./client.js");
    res.end(html);
})*/

server.listen(port, () => {
    console.log("listening at " + port);
});

io.on('connection', (socket) => {
    //console.log("User connected: " + socket.id);
    
const dbconfig = {
    
        server: "DESKTOP-F31R5MH",
        user: "sa",
        password: "12345",
        database: "webchat",
        options: {
          trustServerCertificate: true,
          cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
      }
}
let pool;
var rooom = {}
var users = [];
var usersOnline = []
var userName = {}
    socket.on('roomChoice', (room) =>{
        socket.join(room);
        rooom.room = room;
        socket.emit('roomJoining', userName.user)
    })

   

    socket.on('roomleaving', ()=>{
        socket.leave(rooom.room);
    })
   
    socket.on("loginAccount", async function (data){
        var check = false;
        if(!pool && !usersOnline.includes(data.passwordProp)) {
          pool = await sql.connect(dbconfig) 
            const result = await pool.query("SELECT * FROM tblusers WHERE name like '" +data.userNameProp+"' and chat_password like '"+data.passwordProp+"'");
          
            if(result.recordset.length != 1){
              check = true;
            }     
      //      console.log(check)
        //    console.log(result)
        socket.emit("loginAccountValidation", check)
        users.push(data.userNameProp,);
        userName.user = data.userNameProp;
        usersOnline.push(data.passwordProp);
        }   
        else{
            console.log("user already online");
        }
    })   
    socket.on("message", (msg)=>{
        var userNm = users.find(element => element = userName.user)
        console.log("userNm: " + userNm)
        io.to(rooom.room).emit('sending-message', {message: msg, userName: userNm})
      });
})