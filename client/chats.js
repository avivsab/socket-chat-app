let users = '';
let i =0;
let index = 0;
let currentUser;
const usersArr = [];
const socket = io('http://localhost:8091');
socket.on('serverMsg', (serverData) => {
    console.log('server say:',serverData);
    while (i < serverData.usersArr.length){
       
        usersArr.push(serverData.usersArr[i].userName);
        i++;
        currentUser = serverData.usersArr[i-1].userName;
   
    socket.emit('clientData',serverData);
    }
   
});
socket.on('usersToClient', (usersUpdate) => {
    console.log(usersUpdate)
    console.log(usersUpdate.usersArr.length)
    while (index < usersUpdate.usersArr.length){
        users += `<div> ${usersUpdate.usersArr[index].userName} </ldiv>`;
        usersArr.push(usersUpdate.usersArr[index].userName);
        index++;
        document.querySelector('#activeUsers').innerHTML = users;
            }
            
})  

function clietmessage(e) {
    e.preventDefault();

    msg = document.querySelector('#userMsg').value;
    sender1 = currentUser;
    console.log(msg)
    socket.emit('clientMsg', {
        msgText: msg,
        sender: sender1
    })
}
 
document.querySelector('#msgForm').addEventListener('submit', clietmessage);

socket.on('dataBackToClient', (circleMsg) => {
    console.log(circleMsg)
    
    
    document.querySelector('#usersMsg').innerHTML += `  <section class="col s12 m8 offset-m2 l6 offset-l3 msgDiv">
<div class="card-panel grey lighten-5 z-depth-1">
  <div class="row valign-wrapper">
    <div class="col s2">
    </div>
    <div class="col s10">
      <span class="black-text" id="textMsg"><b> ${circleMsg.sender}: </b>${circleMsg.msgText}</span>
    </div>
  </div>
</div>
</section>`;
    const input = document.getElementById('userMsg');
    input.value = '';
    document.getElementById('userMsg').focus();
    var l = document.getElementsByClassName("msgDiv").length;
    console.log(l)
    document.getElementsByClassName("msgDiv")[l - 1].scrollIntoView();
});


function addPulse() {
    const submitBtn = document.querySelector('#submitMsg');
    submitBtn.setAttribute('class', 'btn btn-info pulse');
};

function initStyleBtn() {
    const submitBtn = document.querySelector('#submitMsg');
    submitBtn.setAttribute('class', 'btn btn-info');
};
