// Query Selectors
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz");
var answerContainer = document.querySelector("#answer-container");
var formEl = document.querySelector("#result-form");
var scoreBtn = document.querySelector("#view-scores");
var goBack = document.querySelector("#go-back");
var noHighScore = document.querySelector("#no-one");

// Get Elements by Id
var quizMenu = document.getElementById("quiz-menu");
var quizQuestions = document.getElementById("quiz-questions");
var qContainer = document.getElementById("question-container");
var resultsDiv = document.getElementById("results");
var aContainer = document.getElementById("answer-container");
var hScoreDiv = document.getElementById("high-scores");
var quizContainer = document.getElementById("quiz-container");

// arrays/object arrays
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
var highScores = [];

// number variables
var questionCount = 0;
var timerNum = 75;

// undefined variable
let timerIntervNum;

//
quizMenu.style.display = "flex";
quizQuestions.style.display = "none";
qContainer.style.display = "flex";
resultsDiv.style.display = "none";
hScoreDiv.style.display = "none";

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
    document.getElementById("view-scores").ariaDisabled = true;
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

var saveScore = function(event){
    event.preventDefault();

    var initialInput = document.querySelector("input").value;
    var scoreDataObj = {
        name: initialInput,
        score: timerNum
    };
    highScores.push(scoreDataObj);

    localStorage.setItem("scores", JSON.stringify(highScores));

    displayHighScores();
};

var displayHighScores = function(){
    quizContainer.style.display = "none";
    hScoreDiv.style.display = "flex";
    loadHighScores();
};

var loadHighScores = function(){
    var highScoreList = document.querySelector("#ordered-list");
    var anyHighScores = highScores.push(localStorage.getItem("scores"));
    if(anyHighScores !== 0){
        noHighScore.textContent = "";
        if(highScores === null){
            highScores = [];
        }

        highScores = JSON.parse(highScores);
        for(var i = 0; i < highScores.length; i++){
            var listItemEl = document.createElement("li");
            listItemEl.textContent = "Initials: " + highScores[i].name + ", Score: " + highScores[i].score;
            highScoreList.appendChild(listItemEl);
        }
    }
    else{
        noHighScore.textContent = "No one has done the test yet.";
    }
}

var goBackToMenu = function(){
    quizContainer.style.display = "flex";
    hScoreDiv.style.display = "none";
    quizMenu.style.display = "flex";
    quizQuestions.style.display = "none";
    qContainer.style.display = "flex";
    resultsDiv.style.display = "none";

    document.querySelector("#view-scores").ariaDisabled = false;
};

loadHighScores();

startBtn.addEventListener("click", displayQuizHandler);
answerContainer.addEventListener("click", changeQuestion);
formEl.addEventListener("submit", saveScore);
scoreBtn.addEventListener("click", displayHighScores);
goBack.addEventListener("click", goBackToMenu)