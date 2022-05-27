var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz");
var quizMenu = document.getElementById("quiz-menu");
var quizQuestions = document.getElementById("quiz-questions");

var questionCount = 0;

quizMenu.style.display = "flex";
quizQuestions.style.display = "none";

var createQuestion = function(){
    var questions = [
        {
            name: "Question 1",
            question: "Commonly used data types does NOT include:",
            answers: ["strings", "booleans", "alerts", "numbers"],
            correctAnswer: ["wrong", "wrong", "correct", "wrong"]
        },
        {
            name: "Question 2",
            question: "The condition of an if/else statement is enclosed with:",
            answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
            correctAnswer: ["wrong", "wrong", "correct", "wrong"]
        },
        {
            name: "Question 3",
            question: "Arrays in JavaScript can store ____.",
            answers: ["numbers and strings", "other arrays", "booleans", "all the above"],
            correctAnswer: ["wrong", "wrong", "wrong", "correct"]
        },
        {
            name: "Question 4",
            question: "String values must be inclosed in ____ when being assigned to variables.",
            answers: ["quotes", "curly brackets", "commas", "parenthesis"],
            correctAnswer: ["correct", "wrong", "wrong", "wrong"]
        },
        {
            name: "Question 5",
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            answers: ["JavaScript", "console.log", "for loops", "terminal/bash"],
            correctAnswer: ["wrong", "correct", "wrong", "wrong"]
        }
    ]
    var questionNum = document.querySelector("#question-number");
    var question = document.querySelector("#question");
    var answers = document.querySelector("#answer-container");

    questionNum.textContent = questions[questionCount].name;
    question.textContent = questions[questionCount].question;
    
    for(var i = 0; i < questions[questionCount].answers.length; i++){
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("answer-value", questions[questionCount].correctAnswer[i]);
        answerBtn.className = "answer-button btn";
        answerBtn.textContent = questions[questionCount].answers[i];

        answers.appendChild(answerBtn);
    }
}
// var startCountDown = function(){
//     var startTimerNum = 75;

// }

var displayQuizHandler = function(){
    quizMenu.style.display = "none";
    quizQuestions.style.display = "flex";
    // startCountDown();
    createQuestion();
}


startBtn.addEventListener("click", displayQuizHandler);