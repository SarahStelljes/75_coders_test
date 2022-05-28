var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz");
var quizMenu = document.getElementById("quiz-menu");
var quizQuestions = document.getElementById("quiz-questions");
var answerContainer = document.querySelector("#answer-container");
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
];
var results = [];
var questionCount = 0;
var qContainer = document.getElementById("question-container");

quizMenu.style.display = "flex";
quizQuestions.style.display = "none";
qContainer.style.display = "flex";

var createQuestion = function(){
    var questionNum = document.querySelector("#question-number");
    var question = document.querySelector("#question");
    var answers = document.querySelector("#answer-container");
    var qCard = document.createElement("div");

    qCard.id = "question-card";
    questionNum.textContent = questions[questionCount].name;
    question.textContent = questions[questionCount].question;
    
    for(var i = 0; i < questions[questionCount].answers.length; i++){
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("answer-name", questions[questionCount].answers[i]);
        answerBtn.setAttribute("answer-value", questions[questionCount].correctAnswer[i]);
        answerBtn.className = "answer-button btn";
        answerBtn.textContent = questions[questionCount].answers[i];

        qCard.appendChild(answerBtn);
        answers.appendChild(qCard);
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

var changeQuestion = function(event){
    var targetEl = event.target;
    var qCard = document.querySelector("#question-card");
    

    if(targetEl.matches(".answer-button[answer-value='correct']")){
        results.push("Correct!")
    }
    else if(targetEl.matches(".answer-button[answer-value='wrong']")){
        results.push("Wrong.");
    }
    qCard.remove();
    questionCount++;
    if(questionCount < 5){
        createQuestion();
    }
    else{
        qContainer.style.display="none";
    }
}

startBtn.addEventListener("click", displayQuizHandler);
answerContainer.addEventListener("click", changeQuestion);