
$('#login').hide();
$('#chat').hide();
$('#alert1').hide();


$(document).ready(function() {
  
    $(".toast").toast({autohide:false});
    $(".toast").toast('show');
  
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
});

$('#key-btn').click(()=>
{
    if($('#key-inp').val()==="123")
    {
       const socket = io();
        $('#key').hide();
        $('#login').show();

        $('#login-btn').click(()=>{
    
   
            socket.emit('login',{
                name: $('#login-inp').val()
            })
            $('#login').hide();
            $('#chat').show();
            $('#alert1').show();
        })

        
        $('#send-btn').click(()=>
       {
      if($('#inp').val()!="")
      {
       
        socket.emit('send_msg',{
            msg:$('#inp').val() 
         })
         $('#inp').val('');
      }
      
     
   
     })

     

socket.on('rcd_msg',(data)=>
{

    if(data.id!=socket.id){
    const toast = document.createElement('div');
    toast.classList.add("toast","mb-2");
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

    toast_header.appendChild(img);
    toast_header.appendChild(strong);
    toast_header.appendChild(small);
    
    const div2 = document.createElement('div');
    div2.classList.add("toast-body");
    
    div2.setAttribute("style","background-color:#f06c00")
    div2.innerText = data.msg;
    toast.appendChild(toast_header);
    toast.appendChild(div2);
    $('.toast-container1').prepend(toast);
    $(".toast").toast({autohide:false});
    $(".toast").toast('show');
    }
    else
    {
    const toast = document.createElement('div');
    toast.classList.add("toast","mb-2");
    toast.setAttribute("aria-live","assertive");
    
    toast.setAttribute("aria-atomic","true");

    const toast_header = document.createElement('div');
    toast_header.classList.add("toast-header");
    

    const img = document.createElement('img');
    img.classList.add("rounded","me-2");
    img.setAttribute("src","https://img.icons8.com/metro/26/000000/chat.png");


    const strong = document.createElement('strong');
    strong.classList.add('me-auto');
    strong.innerText = "You";

    const small = document.createElement('small');
    small.classList.add('me-auto');
    small.innerText = "just now";

    toast_header.appendChild(img);
    toast_header.appendChild(strong);
    toast_header.appendChild(small);
    
    const div2 = document.createElement('div');
    div2.classList.add("toast-body");
    div2.setAttribute("style","background-color:#fdb833");
    div2.innerText = data.msg;
    toast.appendChild(toast_header);
    toast.appendChild(div2);
    $('.toast-container1').prepend(toast);
    $(".toast").toast({autohide:false});
    $(".toast").toast('show');
    }
    
})


socket.on('userlist',(data)=>
{

    if(data.user[data.user.length-1].id===socket.id){
    $('.list-group').empty();
    $('#alert1').show();
     const wlcm = document.querySelector('#alert2');
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
    const wlcm = document.querySelector('#alert2');
    wlcm.innerText = data.user[data.user.length-1].username+" joined the Room";
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
    $('#login').hide();
    $('#alert1').show();
    $('#key').show();
})

socket.on('exit',(data)=>
{
    
    
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

        
    }
   
})



$('#anchor1').click(function(){
    $('#chat').hide();
    $('.toast-container').hide();
    });

    
$('#anchor2').click(function(){
    $('#chat').show();
    $('.toast-container').show();
    });