const socket=io()
let userName;
let text=document.querySelector('.inputText')
const messageArea=document.querySelector('.messageBox')
do{
  userName= prompt('enter your name')
}while(!userName)

text.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
  let msg={
    user:userName,
    message:message.trim()
  }

//append 
appendMessage(msg,'right')
text.value=''
scrollToBottom()

//send to server
socket.emit('chat',msg)
}

function appendMessage(msg,type){
  let div=document.createElement('div')
  let className=type
  div.classList.add('message',className)

  let markup=`
  <h4>${msg.user}</h4>
  <h5>${msg.message}</h5>`

  div.innerHTML=markup
  messageArea.appendChild(div)
}

//receive message

socket.on('chat',(msg)=>{
  appendMessage(msg,'left')
  scrollToBottom()
})

function scrollToBottom(){
  messageArea.scrollTop=messageArea.scrollHeight
}

