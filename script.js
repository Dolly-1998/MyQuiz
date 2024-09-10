const quizData = {
    "quiz": {
        "title": "General Knowledge Quiz",
        "description": "Test your knowledge with these general trivia questions!",
        "questions": [
            {
                "id": 1,
                "question": "What is the capital of France?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Berlin" },
                    { "id": "b", "text": "Madrid" },
                    { "id": "c", "text": "Paris" },
                    { "id": "d", "text": "Rome" }
                ],
                "answer": "c"
            },
            {
                "id": 2,
                "question": "Is the Earth round?",
                "type": "true-false",
                "options": [
                    { "id": "true", "text": "True" },
                    { "id": "false", "text": "False" }
                ],
                "answer": "true"
            },
            {
                "id": 3,
                "question": "Who wrote 'To Kill a Mockingbird'?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Harper Lee" },
                    { "id": "b", "text": "J.K. Rowling" },
                    { "id": "c", "text": "Ernest Hemingway" },
                    { "id": "d", "text": "Mark Twain" }
                ],
                "answer": "a"
            },
            {
                "id": 4,
                "question": "What is the largest planet in our solar system?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Earth" },
                    { "id": "b", "text": "Mars" },
                    { "id": "c", "text": "Jupiter" },
                    { "id": "d", "text": "Saturn" }
                ],
                "answer": "c"
            },
            {
                "id": 5,
                "question": "What is the chemical symbol for gold?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Au" },
                    { "id": "b", "text": "Ag" },
                    { "id": "c", "text": "Pb" },
                    { "id": "d", "text": "Fe" }
                ],
                "answer": "a"
            },
            {
                "id": 6,
                "question": "What is the boiling point of water?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "90°C" },
                    { "id": "b", "text": "100°C" },
                    { "id": "c", "text": "110°C" },
                    { "id": "d", "text": "120°C" }
                ],
                "answer": "b"
            },
            {
                "id": 7,
                "question": "Who painted the Mona Lisa?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Vincent van Gogh" },
                    { "id": "b", "text": "Leonardo da Vinci" },
                    { "id": "c", "text": "Pablo Picasso" },
                    { "id": "d", "text": "Claude Monet" }
                ],
                "answer": "b"
            },
            {
                "id": 8,
                "question": "Which country hosted the 2016 Summer Olympics?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Brazil" },
                    { "id": "b", "text": "China" },
                    { "id": "c", "text": "United Kingdom" },
                    { "id": "d", "text": "Japan" }
                ],
                "answer": "a"
            },
            {
                "id": 9,
                "question": "What is the hardest natural substance on Earth?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Gold" },
                    { "id": "b", "text": "Iron" },
                    { "id": "c", "text": "Diamond" },
                    { "id": "d", "text": "Platinum" }
                ],
                "answer": "c"
            },
            {
                "id": 10,
                "question": "Who was the first person to step on the moon?",
                "type": "multiple-choice",
                "options": [
                    { "id": "a", "text": "Neil Armstrong" },
                    { "id": "b", "text": "Buzz Aldrin" },
                    { "id": "c", "text": "Yuri Gagarin" },
                    { "id": "d", "text": "Michael Collins" }
                ],
                "answer": "a"
            }
        ]
    }
};

let currentQuestionIndex = 0;
let score = 0;

const quizTitle = document.getElementById('quiz-title');
const quizDescription = document.getElementById('quiz-description');
const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');

//Function to load questions
function loadQuestion() {
    const question = quizData.quiz.questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <form id="quiz-form">
            ${question.options.map(option => `
                <div class="option">
                    <input type="radio" id="${option.id}" name="option" value="${option.id}">
                    <label for="${option.id}">${option.text}</label>
                </div>
            `).join('')}
        </form>
    `;

    nextButton.disabled = true;

    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener('change', () => {
            nextButton.disabled = false;
        });
    });
}

//Function to check answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const question = quizData.quiz.questions[currentQuestionIndex];
    const correct = selectedOption.value === question.answer;

    if (correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.quiz.questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

//Function for scoreboard
function showScore() {
    questionContainer.innerHTML = `
        <h2>Your score is ${score} out of ${quizData.quiz.questions.length}!</h2>
        <button id="exit-button">Exit Quiz</button>
    `;
    nextButton.style.display = 'none';

    // Exit Quiz Button Logic
    const exitButton = document.getElementById('exit-button');
    exitButton.addEventListener('click', () => {
        window.location.href = 'index.html';  // Redirect to home page or desired page
    });
}

nextButton.addEventListener('click', checkAnswer);

function startQuiz() {
    quizTitle.textContent = quizData.quiz.title;
    quizDescription.textContent = quizData.quiz.description;
    loadQuestion();
}

startQuiz();
