const path = require('path')
const http = require('http') // koristimo http varijablu za pokretanje http modula
const express = require('express') //pokrecemo express,koji smo prethodno instalirali preko terminala npm install express
const socketio = require('socket.io') //pokrecemo biblioteku socket.io


const aplikacija=express()  //varijabla je dodijeljena funkciji express
const server = http.createServer(aplikacija) // koristimo http biblioteku i metodu createServer da kreiramo novi server
const io = socketio(server) //pozivamo funkciju socketio koju koristimo za prenos podataka izmedju klijenta i servera


const port =  3000 //koristimo port 3000 za localhost
const javniDirektorij=path.join(__dirname, '../public') //koristimo path.join da pridruzimo foldere

aplikacija.use(express.static(javniDirektorij)) //express.static koristimo kada zelimo citav folder stavit na server
 
io.on('connection', (socket)=> { //socket cuva informacije o konekciji
    console.log('Nova konekcija') //u konzoli se ispisuje ova poruka kada neko novi udje na localhost:3000
    
    //socket.emit('message', '') //kada se konektujemo u konzoli nam ispise poruku dobrodoslice
    socket.broadcast.emit('message' , 'Novi korisnik je pristupio chatu') //salje SVIMA OSIM NOVOM korisniku o njegovom pristupu chatu
    
    socket.on('sendMessage', (message,callback) => {  //socket.on ceka na poruku(listen to the event)
        
        io.emit('message', message) //salje poruku SVIM klijentima koji su konektovani na socket(poruku dobrodoslice)
        callback('Delivered')
    }) 

    socket.on('disconnect' , () => {  //ovo se pokrece kada se neko diskonektuje
        io.emit('message', 'Korisnik je napustio chat!') //salje svim konektovanim korisnicima 
    })
})

//da bi podigli server koristimo sljedece, dva parametra port i funkciju koja nam 
//ispisuje poruku u console.log da je server uspjesno podignut
server.listen(port, () => { 
    console.log('Server je podignut na portu ' + port)
})