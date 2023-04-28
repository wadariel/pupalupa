const ws = require('ws');

//создаём websocket - сервер
const wss = new ws.Server({
    port: 5000,
}, () => console.log('Server started on 5000 port'))

//работа с websocket
wss.on('connection', function connection(ws){//подпись подключение к серверу
    ////подпись на сообщения
    ws.on('message', function(message){
        message = JSON.parse(message);//В JSON формат
        switch(message.event){
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

//Широковещательная рассылка сообщений
function broadcastMessage(message){
    wss.clients.forEach(client => {//clients - все подключённые клиенты
        client.send(JSON.stringify(message))
    })
}

// СТРУКТУРА MESSAGE
// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '21.01.2021',
//     username: 'Rick',
//     message: 'Привет'
// }

