const chatForm = document.querySelector('#chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);
});

// Message submit
function submitForm(e) {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);
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
  document.querySelector('.chat-messages').appendChild(div);
}

chatForm.addEventListener('submit', submitForm);
