import socket from '../socket.io/socket.io.js';

let usersList = [];

function displayUser(user) {
    const usersContainer = document.querySelector('div.users');
    const userElement = createUser(user);
    usersContainer.appendChild(userElement);
}

function createUser(user) {
    const userElement = document.createElement('div');
    userElement.className = 'user-container';
    userElement.id = user.id;

    let avatarSrc

    switch (user.avatar) {
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

    const avatarElement = document.createElement('img');
    avatarElement.className = 'user-avatar';
    avatarElement.src = avatarSrc;
    userElement.appendChild(avatarElement);

    const nameElement = document.createElement('p');
    nameElement.className = 'paragraph user-name';
    nameElement.innerText = user.name;
    userElement.appendChild(nameElement);

    return userElement;
}

function addUser(user) {
    if (usersList.filter((u) => u.id === user.id).length === 0) {
        usersList.push(user);
        displayUser(user);
    }
}

function updateUserName(user) {
    const userElement = document.querySelectorAll('#' + user.id);
    userElement.forEach((element) => {
        element.querySelector('.user-name').innerText = user.name;
    });
}

function updateUserAvatar(user) {
    const userElement = document.querySelectorAll('#' + user.id);
    userElement.forEach((element) => {

        let avatarSrc

        switch (user.avatar) {
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

        element.querySelector('.user-avatar').src = window.location + avatarSrc;
    });
}

function removeUser(user) {
    const userElement = document.querySelectorAll('#' + user.id);
    userElement.forEach((element) => {
        element.remove();
    });
}

socket.emit('getUsers');
socket.on('users', (users) => {
    users.forEach((user) => {
        addUser(user);
    });
});

socket.on('userConnection', (user) => {
    addUser(user);
});
socket.on('userDisconnection', (user) => {
    removeUser(user);
});
socket.on("updateUsername", (user) => {
    updateUserName(user);
});
socket.on("updateAvatar", (user) => {
    updateUserAvatar(user);
});
