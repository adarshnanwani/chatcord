const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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
        <p class="meta">Brad <span>9:12pm</span></p>
            <p class="text">
              ${message}
            </p>
  `;
  chatMessages.appendChild(div);
}

chatForm.addEventListener('submit', submitForm);
