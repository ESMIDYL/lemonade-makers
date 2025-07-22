const GEMINI_API_KEY = 'AIzaSyAvFFw1Bv8vzEzLVqvCn06_eQobxw-QD0Y';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_SYSTEM_PROMPT = "You are the helpful chatbot for the website 'When Death Gives You Lemons', a game about a lemonade adventure with monster-hunting, levels (forest, beach, cave), and characters Joe and Jade. Always answer briefly and concisely.";

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('open');
}

async function handleChatInput(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const message = input.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            input.value = '';
            addChatMessage('Thinking...', 'bot');
            const response = await fetchGeminiResponse(message);
            // Remove the 'Thinking...' message
            const messagesDiv = document.querySelector('.chat-messages');
            messagesDiv.removeChild(messagesDiv.lastChild);
            addChatMessage(response, 'bot');
        }
    }
}

async function fetchGeminiResponse(userMessage) {
    try {
        // Add context about the game and short answer instruction
        const context = "You are the chatbot for the website 'When Death Gives You Lemons', a game about a lemonade adventure with monster-hunting, levels (forest, beach, cave), and characters Joe and Jade. ";
        const shortPrompt = context + '(Respond in 1-2 short sentences.) ' + userMessage;
        const res = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [
                  { parts: [{ text: shortPrompt }] }
                ]
            })
        });
        const data = await res.json();
        return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Sorry, I could not get a response from the AI.'
        );
    } catch (e) {
        return 'Sorry, there was an error connecting to the AI.';
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