document.addEventListener('DOMContentLoaded', () => {
            // Existing elements
            const showRegisterButton = document.getElementById('showRegister');
            const showLoginButton = document.getElementById('showLogin');
            const registrationForm = document.getElementById('registrationForm');
            const loginForm = document.getElementById('loginForm');
            const registerSection = document.getElementById('register');
            const loginSection = document.getElementById('login');
            const learnSection = document.getElementById('learn');
            const gameSection = document.getElementById('game');
            const questionElement = document.getElementById('question');
            const optionsContainer = document.getElementById('optionsContainer');
            const submitAnswerButton = document.getElementById('submitAnswer');
            const feedbackElement = document.getElementById('feedback');
            const scoreDisplay = document.getElementById('scoreDisplay');
            const restartGameButton = document.getElementById('restartGame');
        
            // New elements for sign language learning
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            const searchBar = document.querySelector('.search-bar');
            const startButtons = document.querySelectorAll('.start-btn');
            const respondButtons = document.querySelectorAll('.respond-btn');
        
            let isLoggedIn = false;
            let score = 0;
            let currentQuestionIndex = 0;
        
            const quizQuestions = [
                { sign: "✋", question: "What does this mean?", options: ["Hello", "Goodbye", "Yes"], correct: "Hello" },
                { sign: "👌", question: "What does this mean?", options: ["Okay", "No", "Stop"], correct: "Okay" },
                { sign: "👍", question: "What does this mean?", options: ["Good", "Bad", "Maybe"], correct: "Good" },
            ];
        
            // Existing functionality
            const showNextQuestion = () => {
                if (currentQuestionIndex < quizQuestions.length) {
                    const currentQuestion = quizQuestions[currentQuestionIndex];
                    questionElement.textContent = ${currentQuestion.sign} ${currentQuestion.question};
                    optionsContainer.innerHTML = "";
                    currentQuestion.options.forEach((option, index) => {
                        const radioOption = document.createElement('input');
                        radioOption.type = 'radio';
                        radioOption.id = option${index};
                        radioOption.name = 'quizOption';
                        radioOption.value = option;
        
                        const label = document.createElement('label');
                        label.setAttribute('for', option${index});
                        label.textContent = option;
        
                        const div = document.createElement('div');
                        div.appendChild(radioOption);
                        div.appendChild(label);
                        optionsContainer.appendChild(div);
                    });
        
                    submitAnswerButton.classList.remove('hidden');
                } else {
                    feedbackElement.textContent = "Quiz Complete!";
                    scoreDisplay.textContent = Your Final Score: ${score}/${quizQuestions.length};
                    submitAnswerButton.classList.add('hidden');
                    restartGameButton.classList.remove('hidden');
                }
            };
        
            // Existing event listeners
            showRegisterButton.addEventListener('click', () => {
                registerSection.classList.remove('hidden');
                loginSection.classList.add('hidden');
            });
        
            showLoginButton.addEventListener('click', () => {
                loginSection.classList.remove('hidden');
                registerSection.classList.add('hidden');
            });
        
            registrationForm.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('Registration successful!');
                registerSection.classList.add('hidden');
            });
        
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                isLoggedIn = true;
                alert('Login successful!');
                loginSection.classList.add('hidden');
                learnSection.classList.remove('hidden');
                gameSection.classList.remove('hidden');
            });
        
            submitAnswerButton.addEventListener('click', () => {
                const selectedOption = document.querySelector('input[name="quizOption"]:checked');
                if (!selectedOption) {
                    feedbackElement.textContent = "Please select an option!";
                    return;
                }
        
                const selectedAnswer = selectedOption.value;
                if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
                    feedbackElement.textContent = "Correct Answer!";
                    score++;
                } else {
                    feedbackElement.textContent = "Wrong Answer!";
                }
        
                scoreDisplay.textContent = Score: ${score};
                currentQuestionIndex++;
                showNextQuestion();
            });
        
            restartGameButton.addEventListener('click', () => {
                currentQuestionIndex = 0;
                score = 0;
                feedbackElement.textContent = "";
                scoreDisplay.textContent = "";
                restartGameButton.classList.add('hidden');
                showNextQuestion();
            });
        
            // New event listeners for sign language learning
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    button.classList.add('active');
                    document.getElementById(button.dataset.tab).classList.add('active');
                });
            });
        
            searchBar.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const lessons = document.querySelectorAll('.lesson-card');
                const posts = document.querySelectorAll('.community-post');
                
                [...lessons, ...posts].forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
            });
        
            startButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (isLoggedIn) {
                        alert('Starting lesson...');
                    } else {
                        alert('Please login to start a lesson');
                        loginSection.classList.remove('hidden');
                    }
                });
            });
        
            respondButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (isLoggedIn) {
                        alert('Response submitted!');
                    } else {
                        alert('Please login to respond');
                        loginSection.classList.remove('hidden');
                    }
                });
            });
