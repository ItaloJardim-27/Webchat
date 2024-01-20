const socket = io("http://localhost:3000")

//var message = document.getElementById("message").value;

//PARA MUDAR A TELA VOCÊ USA O CLIENTE



const userData = {
    user_Name: "",
    pass_word: ""
}

function send(){
    var msg = document.getElementById("message").value;
    socket.emit('message', msg);
}

socket.on('sending-message', (data)=>{
    const chat = document.getElementById("chat");
    var message = document.createElement("p");
    message.innerHTML = data.userName + ": " + data.message; 
    console.log(data.message);
    message.className = "msg";
    chat.appendChild(message);
    })
/*
socket.on('sending-message', (data)=>{
    const chat = document.getElementById("chat");
    var message = document.createElement("p");
    console.log(msg)
    message.innerHTML = data.userName + ": " + data.message; 
    message.className = "msg";
    chat.appendChild(message);
    })*/




function roomleave(){
    document.getElementById("allRoom").style.display = "block";
    document.getElementById("allChat").style.display = "none";
    const chat = document.getElementById("chat");
    socket.emit('roomleaving');
    var messages = document.getElementsByClassName("msg");
    var child = chat.lastElementChild; 
    while (child) {
        chat.removeChild(child);
        child = chat.lastElementChild;
    }
}

function newAccount(){
    document.getElementById("signUp").style.display = "block";
    document.getElementById("login").style.display = "none";

}

function loginAccount(){
    const userName = document.getElementById("userNameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    userData.user_Name = userName;
    userData.pass_word = password;
    if(userName != "" && password != ""){
    socket.emit("loginAccount", {userNameProp: userName, passwordProp: password});
    console.log(userName)
    }
    else{
        alert("Preencha todos os campos");
    }
    socket.on("loginAccountValidation", check =>{
    if(check == true){
    alert("Usuário ou senha inválidos");    
    }      
    else {
        document.getElementById("login").style.display = "none";
       document.getElementById("allRoom").style.display = "block";
       document.getElementById("welcome").innerHTML = "Bem vindo " + userName + "!";
       
      }
    })
}
function createAccount(){
    var birthday = document.getElementById("birthday").value;
    console.log(birthday);
}
function roomjoin(room){
    //const userArray = []
    const chat = document.getElementById("chat");
  //  console.log(userArray)
    const divRoom = document.getElementById("allRoom").style.display = "none";;
    const divChat = document.getElementById("allChat").style.display = "block";
    socket.emit('roomChoice', room);
    //var rome = room;   
    //var windowRome = window.rome;
    var random = Math.floor(Math.random() * 8);
    socket.on('roomJoining', (userName)=>{
        document.getElementById('name').innerText = userName;
        console.log(userName);
        document.getElementById('profilePic').src = profilePics[random];
        var userJoined = document.createElement("p");
        userJoined.className = "msg";
        userJoined.innerHTML = userName + " se juntou à sala";
        userJoined.className = "msg";
        chat.appendChild(userJoined);
    })
   
    
    
//    userArray.push(userName);
    console.log(userJoined);
    }
const profilePics = [];

profilePics[0] = "pic1.png";
profilePics[1] = "pic2.png";
profilePics[2] = "pic3.png";
profilePics[3] = "pic4.png";
profilePics[4] = "pic5.png";
profilePics[5] = "pic6.png";
profilePics[6] = "pic7.png";
profilePics[7] = "pic8.png";