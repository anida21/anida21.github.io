const socket= io() //za konekciju na server pozivamo funkciju, prihSvata evente od servera

const $messageForm=document.querySelector('#message-form')//uzimamo pomocu id-a message-form
const $messageFormInput=$messageForm.querySelector('input')//pomocu querySelectora pronalazimo ono sto nam je potrebn unutar forme(u ovom slucaju unutar input id-a)
const $messageFormButton=$messageForm.querySelector('button')//querrySelector uzima button
const $messages=document.querySelector('#messages')

//templates
const messageTemplate=document.querySelector('#message-template').innerHTML

socket.on('message', (message) => { //socket.on na klijentskoj strani prima poruku tj. "slusa" za poruku,stavljamo isto ime tj. message kao i u index.js kod socket.emit
    console.log(message) //koristimo socket.on da primimo poruku,  socket "slusa" te u konzoli ispisuje prouku     
    const html=Mustache.render(messageTemplate,
    {message})
    $messages.insertAdjacentHTML('beforeend',html)

})


$messageForm.addEventListener('submit', (e) => { //addEventListener nakon klika daje neki dogadjaj buttonu,tj u ovom slucaju salje se poruka
    e.preventDefault() //ova metoda sprijecava neki dogadjaj nakon sto  se stranica refreshuje
    $messageFormButton.setAttribute('disabled','disabled') //?iskljucimo button da ne mozemo istu poruku poslat vise puta

    const message = e.target.elements.message.value //uzimamo poruku koja je sacuvana u message varijabli
    
    socket.emit('sendMessage', message ,(error)=>{ //socket emituje neki dodadjaj na socket , tj emituje poruku
    $messageFormButton.removeAttribute('disabled') //iskljucuje mogucnost klika na dugme nekoliko sekundi
    $messageFormInput.value='' //brise sadrzaj textbox-a nakon sto se poruka posalje
    $messageFormInput.focus() // kursor ostaje unutar textbox.a
    
        if(error) {
       return console.log(Greška)

   }
   console.log('Poruka poslana') //U konzoli ispisuje kada je poruka poslana
    })
})
