
$(function() {


const socket = io();
//obteniendo los elementos del DOM del interface, simbolo de dolar es solo referencial en constante
const $messageForm = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');


//obteniendo elementos para nickform

const $nickForm  = $('#nickForm');
const $nickError  = $('#nickError');
const $nickname  = $('#nickname');

const $users = $('#usernames');


$nickForm.submit(e=> {

    e.preventDefault();
console.log('enviando ...');

socket.emit('new user', $nickname.val(), data=> { 

    if (data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
  } else {

    $nickError.html(`
    <div class = "alert alert-danger"> 
    That username already exits.
    </div>
    `);
  }
  $nickname.val('');
});

});

//eventos
$messageForm.submit( e => {

    e.preventDefault();
//console.log('enviando datos');

//console.log($messageBox.val());
socket.emit('send message',$messageBox.val());
$messageBox.val('');

});

socket.on('new message',function(data) {
$chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>' );

});

socket.on('usernames', data => { 

    let html = '';

    for (let i = 0; i < data.length; i++) {

        html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`

        $users.html(html);
    }


});


})