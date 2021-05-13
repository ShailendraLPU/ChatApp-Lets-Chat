const socket = io();
$('#inp').emojioneArea({
    pickerPosition:'bottom',
    inline: true,
    hideSource: true,
  
    });
$('#alert1').hide();
$('#chat').hide();
( function () {
    'use strict'
    var forms = document.querySelectorAll('.validated-form')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

$(document).ready(function() {
  
    $(".toast").toast({autohide:false});
    $(".toast").toast('show');
   

});

$('#login-btn').click(()=>
{
    socket.emit('login',{
        name: $('#login-inp').val()
    })
    $('#login').hide();
    $('#chat').show();
})



$('#send-btn').click(()=>
{
    socket.emit('send_msg',{
       msg:$('#inp').val() 
    })
    $('#inp').val("");

})

socket.on('rcd_msg',(data)=>
{
    const toast = document.createElement('div');
    toast.classList.add("toast");
    toast.setAttribute("aria-live","assertive");
    toast.setAttribute("aria-atomic","true");

    const toast_header = document.createElement('div');
    toast_header.classList.add("toast-header");

    const img = document.createElement('img');
    img.classList.add("rounded","me-2");
    img.setAttribute("src","https://img.icons8.com/metro/26/000000/chat.png");


    const strong = document.createElement('strong');
    strong.classList.add('me-auto');
    strong.innerText = data.name;

    const small = document.createElement('small');
    small.classList.add('me-auto');
    small.innerText = "just now";

    const button = document.createElement('button');
    button.classList.add("btn-close");
    button.setAttribute("type","button");
    toast.setAttribute("data-bs-dismiss","toast");
    toast.setAttribute("aria-label","close");
   
    toast_header.appendChild(img);
    toast_header.appendChild(strong);
    toast_header.appendChild(small);
    toast_header.appendChild(button);
    
    const div2 = document.createElement('div');
    div2.classList.add("toast-body");
    div2.innerText = data.msg;
    toast.appendChild(toast_header);
    toast.appendChild(div2);
    $('.toast-container').prepend(toast);
    $(".toast").toast({autohide:false});
    $(".toast").toast('show');
    console.log("hii");
    
})


socket.on('userlist',(data)=>
{
   
    if(data.user[data.user.length-1].id===socket.id){
        $('.list-group').empty();
    // console.log(socket.id);
    console.log(data.user);
    console.log("new user");
     $('#alert1').show();
     var wlcm = document.querySelector('#alert2');
     wlcm.innerText = "Welcome!! "+data.user[data.user.length-1].username;
     data.user.forEach(element => {
     const list = document.createElement('li');
     list.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
     list.innerText = element.username;
     const span  = document.createElement('span');
     span.classList.add("badge","bg-success","rounded-pill","text-success");
     span.innerText= ".";
     list.append(span);
     $('.list-group').prepend(list);
     
   })
}
else{
    console.log(data.user);
    console.log("existed user");
    const list = document.createElement('li');
    list.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    list.innerText = data.user[data.user.length-1].username;
    const span  = document.createElement('span');
    span.classList.add("badge","bg-success","rounded-pill","text-success");
    span.innerText= ".";
    list.append(span);
    $('.list-group').prepend(list);
}
})

$('#logout').click(()=>
{
    socket.emit('logout');
    $('#chat').hide();
    $('#login').show();
    $('#alert1').show();
})

socket.on('exit',(data)=>
{
    console.log(data.users);
    console.log(data.outname===undefined);
    if((data.outname===undefined || data.outname==-1))
    { 
        data.outname=2;
        if(socket.id===data.out){
        const out = document.querySelector('#alert2');
        out.innerText = "You didn't join the room yet";
        }
    }
  
    if(data.out===socket.id && data.outname!=2)
    {
        const out = document.querySelector('#alert2');
        out.innerText = "You Left the Room";
    }
    else if(data.out!=socket.id && data.outname!=2)
    {
     const out = document.querySelector('#alert2');
     out.innerText = data.outname + " left the Room";
    }
        
   
        $('.list-group').empty();
        data.users.forEach(element => {
        const list = document.createElement('li');
        list.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        list.innerText = element.username;
        const span  = document.createElement('span');
        span.classList.add("badge","bg-success","rounded-pill","text-success");
        span.innerText= ".";
        list.append(span);
        $('.list-group').prepend(list);
   
     })
    
   
})