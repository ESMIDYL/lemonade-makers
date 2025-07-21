function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('open');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const message = input.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            input.value = '';
            setTimeout(() => {
                addChatMessage('Thanks for your message! We\'ll get back to you soon. 🍋', 'bot');
            }, 1000);
        }
    }
}

function addChatMessage(message, sender) {
    const messagesDiv = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.style.background = sender === 'user' ? '#FFD700' : '#f8f9fa';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add chat widget HTML to page
document.addEventListener('DOMContentLoaded', function() {
    const chatHTML = `
        <div class="contact-chat">
            <button class="chat-button" onclick="toggleChat()">💬</button>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    🍋 Lemon Support
                </div>
                <div class="chat-messages">
                    <div class="chat-message">
                        Hi! Need help with our lemonade adventure? Ask us anything!
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." onkeypress="handleChatInput(event)">
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
});