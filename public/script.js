const socket = io();  //used for connection to the server

$('#chatting').hide();

$('#send-btn').click(function () {

    // console.log('clicked');
    const msgText = $('#inp-msg').val();  //we'll grab the text from the input and we'll emit 1 event into the client pipeline

    socket.emit('send-msg', {  //emit on pipeline, msg is being sent to the server now, it'll go into index.js
        msg: msgText
    });

    $('#inp-msg').val("");  //clearing the textbox

})

socket.on('received-msg', (data) => {   //client receives the reply back here, and will display it in li.
    $('#chat').append(`<li> <strong>${data.user}</strong> : ${data.msg}</li>`)
    $("#chat-box").scrollTop($("#chat-box").outerHeight());
});

$('#login-btn').click(function () {
    const user = $('#login-inp').val();
    socket.emit('login', {   //by sending this login event we are getting the username
        user:user   //we're sending this to the backend index.js
    })

    $('#login-inp').val("");  //we want that when we start user page displays and not chatting. and when user logs in then chatting should appear and login should disapper
    $('#login').hide();
    $('#chatting').show();
})