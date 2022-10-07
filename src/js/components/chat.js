import socket from '../socket.io/socket.io.js';

//CHANGE ROOM

let currentRoom = "general";

socket.emit('joinRoom', currentRoom);
getMessages();

const rooms = document.querySelectorAll('div.room');

rooms.forEach((room) => {
    room.addEventListener('click', (e) => {
        e.preventDefault()
        const roomName = room.getAttribute('data-room');
        if (roomName !== currentRoom) {
            changeRoom(roomName);
            rooms.forEach((room) => {
                room.classList.remove('active');
            });
            room.classList.add('active');
        }
    })
});

function changeRoom(roomName) {
    socket.emit('leaveRoom', currentRoom);
    messagesContainer.innerHTML = '';
    socket.emit('joinRoom', roomName);
    currentRoom = roomName;
    needMessages = true;
    getMessages();
}

//DISPLAY MESSAGES


const messagesContainer = document.querySelector('div.messages');

function displayMessage(message) {
    if (message.room === currentRoom) {
        const messageContainer = createMessage(message);
        messagesContainer.appendChild(messageContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function createMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    if (socket.id === message.user.id) {
        messageContainer.classList.add('align-right');
    } else {
        messageContainer.classList.add('align-left');
    }

    let avatarSrc

    switch (message.user.avatar) {
        case 'divinity':
            avatarSrc= './src/assets/img/avatar/divinity.svg';
            break;

        case 'pharaon':
            avatarSrc = './src/assets/img/avatar/pharaon.svg';
            break;

        case 'karhou':
            avatarSrc = './src/assets/img/avatar/karhou.svg';
            break;

        default:
            avatarSrc = './src/assets/img/avatar/karhou.svg';
            break
    }

    //User
    const userElement = document.createElement('img');
    userElement.className = 'message-username';
    userElement.id = message.user.id;
    userElement.src = avatarSrc;
    messageContainer.appendChild(userElement);

    const contentContainer = document.createElement('div');
    contentContainer.className = 'message-content-container';
    messageContainer.appendChild(contentContainer);

    //Time
    const timeElement = document.createElement('p');
    timeElement.className = 'paragraph-small message-time';
    timeElement.innerText = new Date(message.time).toLocaleTimeString().slice(0, -3).replace(':', 'h');

    contentContainer.appendChild(timeElement);

    //Content
    let messageElement;
    switch (message.type) {
        case 'text':
            messageElement = createTextElement(message.value);
            break;
        case 'image':
            messageElement = createImageElement(message.value);
            break;
        case 'video':
            messageElement = createVideoElement(message.value);
            break;
        case 'audio':
            messageElement = createAudioElement(message.value);
            break;
        default:
            messageElement = createTextElement(message.value);
            break;
    }
    contentContainer.appendChild(messageElement);


    return messageContainer;
}


function createTextElement(text) {
    const textElement = document.createElement('p');
    textElement.className = 'paragraph message-text';
    textElement.innerText = text
    return textElement;
}

let needMessages = true;

function getMessages() {
    socket.emit('getMessages');
    socket.on('messages', (messages) => {
        if (needMessages) {
            messages.slice(-100).forEach((message) => {
                displayMessage(message);
            });
            needMessages = false;
        }
    })
}

socket.on('message', (message) => {
    displayMessage(message);
})


//SEND MESSAGE

window.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.querySelector('form.message');
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageValue = messageForm.querySelector('input#message').value;
        const messageType = "text";
        const message = {type: messageType, value: messageValue, room: currentRoom};
        sendMessage(message);
        document.querySelector('form.message').reset();
    });
})


function sendMessage(message) {
    socket.emit('message', message);
}