// Add interactive hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Button hover effects with pixel-style wiggle
    const buttons = document.querySelectorAll('.btn, .social-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'wiggle 0.5s ease-in-out';
        });
        
        btn.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Card hover animations
    const cards = document.querySelectorAll('.dev-card, .level-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const sprite = this.querySelector('.dev-sprite, .level-icon');
            if (sprite) {
                sprite.style.animation = 'bounce 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const sprite = this.querySelector('.dev-sprite, .level-icon');
            if (sprite) {
                sprite.style.animation = '';
            }
        });
    });
    
    // Floating lemon animation enhancement
    const floatingLemon = document.querySelector('.floating-lemon');
    if (floatingLemon) {
        floatingLemon.addEventListener('click', function() {
            this.style.animation = 'spin 1s linear';
            setTimeout(() => {
                this.style.animation = 'spin 4s linear infinite';
            }, 1000);
        });
    }
    
    // Add pixel noise effect to background
    createPixelNoise();
});

// Create subtle pixel noise pattern
function createPixelNoise() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wiggle {
            0%, 100% { transform: translateX(0px); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        .level-visual::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 25% 25%, #FFD700 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, #FFA500 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.1;
            pointer-events: none;
        }
        
        .pixel-scene::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 215, 0, 0.1) 2px,
                rgba(255, 215, 0, 0.1) 4px
            );
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Add click sound effect simulation
function playClickSound() {
    // Visual feedback for clicks since we can't guarantee audio
    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: #FFD700;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: clickPulse 0.3s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
        clickEffect.remove();
    }, 300);
}

// Add click pulse animation
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);

// Add click effects to interactive elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .social-btn, .nav-menu a')) {
        playClickSound();
    }
});

// Add Back to Top button to every page
function addBackToTopButton() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.title = 'Back to Top';
    btn.innerHTML = '↑';
    btn.style.display = 'none';
    btn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', addBackToTopButton);

let score = 0;
const totalQuestions = 10;
const correctAnswers = {
    1: 'B', 2: 'C', 3: 'A', 4: 'C', 5: 'A',
    6: 'B', 7: 'C', 8: 'A', 9: 'B', 10: 'C'
};

function selectAnswer(questionNum, answer) {
    const questionDiv = document.getElementById(`question-${questionNum}`);
    const answerButtons = questionDiv.querySelectorAll('.answer-btn');
    const selectedButton = Array.from(answerButtons).find(btn => btn.textContent.startsWith(answer));

    // Disable all buttons for this question
    answerButtons.forEach(btn => btn.classList.add('disabled'));

    if (correctAnswers[questionNum] === answer) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        // Optionally, show the correct answer
        const correctButton = Array.from(answerButtons).find(btn => btn.textContent.startsWith(correctAnswers[questionNum]));
        correctButton.classList.add('correct');
    }

    setTimeout(() => {
        showNextQuestion(questionNum);
    }, 1500); // Wait 1.5 seconds before next question
}

function showNextQuestion(currentQuestionNum) {
    const currentQuestion = document.getElementById(`question-${currentQuestionNum}`);
    currentQuestion.classList.add('hidden');

    const nextQuestionNum = currentQuestionNum + 1;
    if (nextQuestionNum <= totalQuestions) {
        const nextQuestion = document.getElementById(`question-${nextQuestionNum}`);
        nextQuestion.classList.remove('hidden');
    } else {
        showResults();
    }
}

function showResults() {
    const results = document.getElementById('results');
    const scoreText = document.getElementById('score-text');
    scoreText.textContent = `You scored ${score} out of ${totalQuestions}!`;
    results.classList.remove('hidden');
}

function restartQuiz() {
    score = 0;
    document.querySelectorAll('.question').forEach((q, i) => {
        q.classList.add('hidden');
        q.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'disabled');
        });
    });
    document.getElementById('results').classList.add('hidden');
    document.getElementById('question-1').classList.remove('hidden');
}

window.selectAnswer = selectAnswer;
window.restartQuiz = restartQuiz;