const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

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
