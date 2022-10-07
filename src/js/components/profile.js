import socket from '../socket.io/socket.io.js';

function setName(name) {
    socket.emit('setUsername', name);
}

function setAvatar(avatar) {
    socket.emit('setAvatar', avatar);
}

function changePage() {
    document.querySelector('section.connectionPage').style.display = 'none';
    document.querySelector('section.chatPage').style.display = 'flex';
}

window.addEventListener("DOMContentLoaded", ()=>{
    const usernameForm = document.querySelector('form.profile');
    usernameForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        setName(usernameForm.querySelector('input#name').value);
        setAvatar(usernameForm.querySelector('input[name="avatar"]:checked').value);
        document.querySelector('form.profile').reset();
        changePage();
    });
})

