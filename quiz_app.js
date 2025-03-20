document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "Which language is used for web development?",
            options: ["Python", "Java", "JavaScript", "C++"],
            answer: "JavaScript"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 10;
    let timer;

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const timeElement = document.getElementById("time");
    const nextButton = document.getElementById("next-btn");
    const scoreElement = document.getElementById("score");

    function startQuiz() {
        showQuestion();
    }

    function showQuestion() {
        resetState();
        clearInterval(timer);
        timeLeft = 10;
        timeElement.innerText = timeLeft;
        startTimer();

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = () => selectAnswer(button, currentQuestion.answer);
            optionsElement.appendChild(button);
        });
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeElement.innerText = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function resetState() {
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
    }

    function selectAnswer(selectedButton, correctAnswer) {
        clearInterval(timer);
        if (selectedButton.innerText === correctAnswer) {
            score += 10;
            scoreElement.innerText = `Score: ${score}`;
        }
        nextButton.style.display = "block";
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        questionElement.innerText = "Quiz Completed!";
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.innerText = `Final Score: ${score}`;
    }

    nextButton.addEventListener("click", () => {
        nextButton.style.display = "none";
        nextQuestion();
    });

    startQuiz();
});
