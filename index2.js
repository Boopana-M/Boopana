document.addEventListener('DOMContentLoaded', () => {
    // Existing elements
    const showRegisterButton = document.getElementById('showRegister');
    const showLoginButton = document.getElementById('showLogin');
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const registerSection = document.getElementById('register');
    const loginSection = document.getElementById('login');
    const learnSection = document.getElementById('signLearning');  // Learn and Community section
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

    // Show next quiz question
    const showNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length) {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            questionElement.textContent = `${currentQuestion.sign} ${currentQuestion.question}`;
            optionsContainer.innerHTML = "";
            currentQuestion.options.forEach((option, index) => {
                const radioOption = document.createElement('input');
                radioOption.type = 'radio';
                radioOption.id = `option${index}`;
                radioOption.name = 'quizOption';
                radioOption.value = option;
  
                const label = document.createElement('label');
                label.setAttribute('for', `option${index}`);
                label.textContent = option;
  
                const div = document.createElement('div');
                div.appendChild(radioOption);
                div.appendChild(label);
                optionsContainer.appendChild(div);
            });
            submitAnswerButton.classList.remove('hidden');
            feedbackElement.textContent = "";
        } else {
            feedbackElement.textContent = `Quiz Over! Your final score is: ${score}`;
            restartGameButton.classList.remove('hidden');
        }
    };

    // Submit answer and move to next question
    const submitAnswer = () => {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            const correctAnswer = quizQuestions[currentQuestionIndex].correct;
            if (answer === correctAnswer) {
                score++;
                feedbackElement.textContent = "Correct!";
            } else {
                feedbackElement.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
            }
            scoreDisplay.textContent = `Score: ${score}`;
            currentQuestionIndex++;
            submitAnswerButton.classList.add('hidden');
            setTimeout(showNextQuestion, 1000);  // Move to next question after 1 second
        } else {
            feedbackElement.textContent = "Please select an answer!";
        }
    };

    // Restart the quiz
    const restartGame = () => {
        score = 0;
        currentQuestionIndex = 0;
        scoreDisplay.textContent = "";
        restartGameButton.classList.add('hidden');
        showNextQuestion();
    };

    // Show learn section and hide others
    const showLearnSection = () => {
        if (isLoggedIn) {
            learnSection.classList.remove('hidden');
            gameSection.classList.add('hidden');
        } else {
            alert("Please log in to access the lessons.");
        }
    };

    // Toggle between Learn and Community tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabName = e.target.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.id === tabName) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Start lesson button in "Learn" section
    startButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isLoggedIn) {
                gameSection.classList.remove('hidden');
                learnSection.classList.add('hidden');
                showNextQuestion();
            } else {
                alert("Please log in to start the lesson.");
            }
        });
    });

    // Respond to community posts
    respondButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert("Response functionality is under construction.");
        });
    });

    // Show the login and registration sections
    showRegisterButton.addEventListener('click', () => {
        registerSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
    });

    showLoginButton.addEventListener('click', () => {
        loginSection.classList.remove('hidden');
        registerSection.classList.add('hidden');
    });

    // Handle form submissions for registration and login
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;  // Simulate login
        alert("Registration successful! You are now logged in.");
        registerSection.classList.add('hidden');
        learnSection.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLoggedIn = true;  // Simulate login
        alert("Login successful!");
        loginSection.classList.add('hidden');
        learnSection.classList.remove('hidden');
    });

    // Initialize quiz
    restartGameButton.addEventListener('click', restartGame);
    submitAnswerButton.addEventListener('click', submitAnswer);
});
