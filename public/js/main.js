const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const userList = document.querySelector('#users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', setRoomUsers);

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
function submitForm(e) {
  e.preventDefault();

  const msgField = e.target.elements.msg;

  // Get message text
  const msg = msgField.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input and focus
  msgField.value = '';
  msgField.focus();
}

function setRoomUsers({ room, users }) {
  console.log(room, users);
  outputRoomName(room);
  outputUsers(users);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users
function outputUsers(users) {
  usersHtml = users.map(user => `<li>${user.username}</li>`).join('');
  userList.innerHTML = usersHtml;
}

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>
  `;
  chatMessages.appendChild(div);
}

chatForm.addEventListener('submit', submitForm);
