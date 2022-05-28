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
var resultsDiv = document.getElementById("results");
var aContainer = document.getElementById("answer-container");
var timerNum = 75;
let timerIntervNum;

quizMenu.style.display = "flex";
quizQuestions.style.display = "none";
qContainer.style.display = "flex";
resultsDiv.style.display = "none";

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
var startCountDown = function(){
    timerNum--;
    if(timerNum >= 0){
        timerEl.textContent = "Time Left: " + timerNum + " secs";
    }
    if(timerNum === 0){
        theResults();
    }
    return timerIntervNum
}

var startQuiz = function(){
    timerEl.textContent = "Time Left: " + timerNum + " secs";
    timerIntervNum = setInterval(startCountDown, 1000);
};

var displayQuizHandler = function(){
    quizMenu.style.display = "none";
    quizQuestions.style.display = "flex";
    startQuiz();
    createQuestion();
}

var theResults = function(){
    var showScore = document.getElementById("score");
    var qResults = document.querySelector("#question-results");
    var whenDone = document.querySelector("#finish-status");

    console.log(showScore);

    aContainer.style.display="none";
    qContainer.style.display="none";
    resultsDiv.style.display="flex";
    
    for(var i = 0; i < results.length; i++){
        var listEl = document.createElement("li");
        if(results[i] === "Correct"){
            listEl.style.backgroundColor = "var(--correct-answer)";
        }
        else if(results[i] === "Wrong"){
            listEl.style.backgroundColor = "var(--wrong-answer)";
        }

        listEl.className = "answer-results";
        listEl.textContent = results[i];

        qResults.appendChild(listEl);
    }
    if(timerNum > 0){
        whenDone.textContent = "All done!";
        showScore.textContent += " "+timerNum;
        clearInterval(timerIntervNum);
        timerIntervNum = null;
    }
    else{
        whenDone.textContent = "You ran out of time!";
        showScore.textContent += " "+timerNum;
        clearInterval(timerIntervNum);
        timerIntervNum = null;
    }
};

var changeQuestion = function(event){
    var targetEl = event.target;
    var qCard = document.querySelector("#question-card");
    

    if(targetEl.matches(".answer-button[answer-value='correct']")){
        results.push("Correct")
        qCard.remove();
        questionCount++;
        if(questionCount < 5){
            createQuestion();
        }
        else{
            theResults();
        }
    }
    else if(targetEl.matches(".answer-button[answer-value='wrong']")){
        timerNum = timerNum - 10;
        results.push("Wrong");
        qCard.remove();
        questionCount++;
        if(questionCount < 5){
            createQuestion();
        }
        else{
            theResults();
        }
    }
}

startBtn.addEventListener("click", displayQuizHandler);
answerContainer.addEventListener("click", changeQuestion);