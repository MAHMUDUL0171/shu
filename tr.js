document.getElementById('login-button').addEventListener('click', login);
document.getElementById('connect-button').addEventListener('click', connect);
document.getElementById('send-button').addEventListener('click', sendMessage);

let loggedInUser = '';
let connectedUser = '';

function login() {
    const emailInput = document.getElementById('email-input');
    if (emailInput.value) {
        loggedInUser = emailInput.value;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
    }
}

function connect() {
    const connectEmailInput = document.getElementById('connect-email-input');
    if (connectEmailInput.value) {
        connectedUser = connectEmailInput.value;
        alert(`Connected with ${connectedUser}`);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const fileInput = document.getElementById('file-input');
    const chatWindow = document.getElementById('chat-window');

    if (messageInput.value || fileInput.files.length) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');

        if (messageInput.value) {
            const textNode = document.createTextNode(`You: ${messageInput.value}`);
            messageDiv.appendChild(textNode);
        }

        if (fileInput.files.length) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const mediaElement = file.type.startsWith('image/') ? new Image() : document.createElement('video');
                mediaElement.src = event.target.result;
                mediaElement.controls = true;
                mediaElement.style.maxWidth = '100%';
                mediaElement.style.marginTop = '10px';
                messageDiv.appendChild(mediaElement);
            }
            reader.readAsDataURL(file);
        }

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        messageInput.value = '';
        fileInput.value = '';
    }
}
