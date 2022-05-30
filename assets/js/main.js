// Query Selectors
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-quiz");
var answerContainer = document.querySelector("#answer-container");
var formEl = document.querySelector("#result-form");
var scoreBtn = document.querySelector("#view-scores");
var goBack = document.querySelector("#go-back");
var lResultsAll = document.querySelectorAll("#list-results");
var hScoreBGAll = document.querySelectorAll("#HighScore-list-background");
var noHighScore = document.querySelector("#no-one");
var lResults = document.querySelector("#list-results");
var lCard = document.querySelector("#list-card");


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

// displaying styles on load
quizMenu.style.display = "flex";
quizQuestions.style.display = "none";
qContainer.style.display = "flex";
resultsDiv.style.display = "none";
hScoreDiv.style.display = "none";

// creating a question
var createQuestion = function(){
    // defining local querySelectors
    var questionNum = document.querySelector("#question-number");
    var question = document.querySelector("#question");
    var answers = document.querySelector("#answer-container");
    var qCard = document.createElement("div");

    // set qCard's id
    qCard.id = "question-card";

    // setting vars text contents
    questionNum.textContent = questions[questionCount].name;
    question.textContent = questions[questionCount].question;
    
    // creating answer buttons based on questions 
    for(var i = 0; i < questions[questionCount].answers.length; i++){
        // create the button element
        var answerBtn = document.createElement("button");

        // setting attributes to button
        answerBtn.setAttribute("answer-name", questions[questionCount].answers[i]);
        answerBtn.setAttribute("answer-value", questions[questionCount].correctAnswer[i]);

        // setting button's class names
        answerBtn.className = "answer-button btn";

        // setting button's text content to an answer
        answerBtn.textContent = questions[questionCount].answers[i];

        // appending elements to other elements
        qCard.appendChild(answerBtn);
        answers.appendChild(qCard);
    }
};

// count down function
var startCountDown = function(){
    // decrease the timer seconds by 1
    timerNum--;

    // if has more than 0 seconds remaining, then set text
    if(timerNum >= 0){
        timerEl.textContent = "Time Left: " + timerNum + " secs";
    }

    // if timer reaches 0 seconds, call for the results
    if(timerNum === 0){
        theResults();
    }

    // returns a var
    return timerIntervNum
};


// start the quiz
var startQuiz = function(){
    // reset the timer seconds
    timerNum = 75;

    // set the timer seconds into a text
    timerEl.textContent = "Time Left: " + timerNum + " secs";

    // call count down function every one second, creating a timer
    timerIntervNum = setInterval(startCountDown, 1000);
};

// displays the quiz
var displayQuizHandler = function(){
    // hiding menu and showing the quiz
    quizMenu.style.display = "none";
    quizQuestions.style.display = "flex";
    aContainer.style.display = "flex";

    // disable view scores button
    document.getElementById("view-scores").disabled = true;

    // set question to 0
    questionCount = 0;

    // starts the quiz
    startQuiz();

    // creates the first question
    createQuestion();
};

// function to delete an element that contains the results
var rLCardDeletion = function(){
    while(lResults.firstChild){
        lResults.removeChild(lResults.firstChild);
    }
};

// results function
var theResults = function(){
    // get elements
    var showScore = document.getElementById("score");
    var whenDone = document.querySelector("#finish-status");

    // calls function to delete previous results
    rLCardDeletion();

    // creates elements
    var rLCard = document.createElement("div");
    var rOrderedList = document.createElement("ol");

    // sets ids for the elements
    rLCard.id = "results-card";
    rOrderedList.id = "results-ordered-list";

    // appends the elements
    rLCard.appendChild(rOrderedList);
    lResults.appendChild(rLCard);

    // hides and reveals some elements
    aContainer.style.display="none";
    qContainer.style.display="none";
    resultsDiv.style.display="flex";
    
    // sets an element's text
    showScore.textContent = "Score:";

    // creates an element for each questions result's
    for(var i = 0; i < results.length; i++){
        // creates a list element
        var listEl = document.createElement("li");

        // gets results from each questions and sets a colors depending on whether the answer is correct or not.
        if(results[i] === "Correct"){
            // sets result's background color to green
            listEl.style.backgroundColor = "var(--correct-answer)";
        }
        else if(results[i] === "Wrong"){
            // sets result's background color to red
            listEl.style.backgroundColor = "var(--wrong-answer)";
        }

        // sets list element's class name
        listEl.className = "answer-results";

        // sets list element's text content based on which result it is on
        listEl.textContent = results[i];

        // appends list element to an ordered list
        rOrderedList.appendChild(listEl);
    }
    // deletes results array items depending on how many items are in the array
    while(results.length >  0){
        results.splice(0, 1);
    }

    // when timer runs out, if timerNum is greater that 0 seconds, then set special text letting tester know that they're done and resets the timer
    if(timerNum > 0){
        whenDone.textContent = "All done!";
        showScore.textContent += " "+timerNum;
        clearInterval(timerIntervNum);
        timerIntervNum = null;
    }
    // if timerNum is anything other than above 0, then set special text letting tester know they've ran out of time and resets the timer
    else{
        whenDone.textContent = "You ran out of time!";
        showScore.textContent += " "+timerNum;
        clearInterval(timerIntervNum);
        timerIntervNum = null;
    }
};

// changes the question
var changeQuestion = function(event){
    // targets the element that's click on
    var targetEl = event.target;

    // gets question card
    var qCard = document.querySelector("#question-card");
    
    // if target matches an answer button with the attribute answer-value with the value of correct
    if(targetEl.matches(".answer-button[answer-value='correct']")){
        // pushes the string correct to the results array
        results.push("Correct")

        // removes the qCard
        qCard.remove();
        
        // increases the question count by 1, which allows it to move on to the next question when createQuestion is called
        questionCount++;

        // if current question is not question 5, then creates the next question
        if(questionCount < 5){
            createQuestion();
        }

        // if current question is question 5, the show the test results
        else{
            theResults();
        }
    }
    // applies to when the tester clicks on the wrong answer
    else if(targetEl.matches(".answer-button[answer-value='wrong']")){
        // subtracts 20 seconds from timer
        timerNum = timerNum - 20;
        
        // pushes the word Wrong to results array
        results.push("Wrong");

        // same as before
        qCard.remove();
        questionCount++;
        if(questionCount < 5){
            createQuestion();
        }
        else{
            theResults();
        }
    }
};


// saves the score
var saveScore = function(event){
    // prevents page from refreshing when form is submitted
    event.preventDefault();

    // gets input value
    var initialInput = document.querySelector("input").value;

    // keeps tester from entering entering empty text and from entering less than 2 charcters but more than 3
    if(initialInput === null || initialInput === ""){
        alert("You need to add some kind of text!");
        return false;
    }
    else if(initialInput.length > 3 || initialInput.length < 2){
        alert("You need to put at least 2 characters and at max 3 characters in.");
        return false;
    }

    // creates/sets data obj
    var scoreDataObj = {
        name: initialInput,
        score: timerNum
    };

    // pushes data obj into highscores array
    highScores.push(scoreDataObj);

    // stores highscores array in local storage
    localStorage.setItem("scores", JSON.stringify(highScores));

    // displays highscores
    displayHighScores();

    // loads highscores
    loadHighScores();
};

// function that displays highscores
var displayHighScores = function(){
    quizContainer.style.display = "none";
    hScoreDiv.style.display = "flex";
};

// function that removes previous highscores list
var hSListRemove = function(){
    while(lCard.firstChild){
        lCard.removeChild(lCard.firstChild);
    }
};

// function that loads highscores
var loadHighScores = function(){
    // gets highscores from localStorage
    var anyHighScores = localStorage.getItem("scores");

    // if any highscores are available in local storage...
    if(anyHighScores){
        // remove previous highlist scores list if there was one already loaded
        hSListRemove();
        
        // create elements
        var hsCard = document.createElement("div");
        var hsOrderedList = document.createElement("ol");

        // assign IDs to the created elements
        hsCard.id= "hs-card-";
        hsOrderedList.id = "hs-ol";

        // appends the elements to other elements
        hsCard.appendChild(hsOrderedList);
        lCard.appendChild(hsCard);

        // sets text content to a p element to nothing
        noHighScore.textContent = "";

        // if highscores array is null, set it to an array
        if(highScores === null){
            highScores = [];
        }
        // turns the highscores from local storage into real items and sets it to highscores array
        highScores = JSON.parse(anyHighScores);

        // creates list element for previous and new highscores based on what's currently in highscores array
        for(var i = 0; i < highScores.length; i++){

            // create list element
            var listItemEl = document.createElement("li");

            // set list item's text content
            listItemEl.textContent = "Initials: " + highScores[i].name + ", Score: " + highScores[i].score;

            // appends list item element
            hsOrderedList.appendChild(listItemEl);
        }
    }

    // if no highscores are in local storage
    else{
        // set an element's text content in order to let the tester know that there are no high scores yet
        noHighScore.textContent = "No one has done the test yet.";
    }
};


// function to go back to menu
var goBackToMenu = function(){
    // set timer text to default
    timerEl.textContent = "Timed Quiz: 75 seconds.";

    // hides the quiz itself and the highscore board and shows the quiz menu
    quizContainer.style.display = "flex";
    hScoreDiv.style.display = "none";
    quizMenu.style.display = "flex";
    quizQuestions.style.display = "none";
    qContainer.style.display = "flex";
    resultsDiv.style.display = "none";

    // turns on the ability to go to the highscore board
    document.querySelector("#view-scores").disabled = false;
};

// clears highscores
var clearHScore = function(){
    // clears local storage
    localStorage.clear();

    // resets highscores array to empty
    highScores = [];

    // removes previous highscores from highscore board
    hSListRemove();
    // refreshes highscore board
    loadHighScores();
}

// loads highscores when page loads
loadHighScores();

// add event listeners to elements
startBtn.addEventListener("click", displayQuizHandler);
answerContainer.addEventListener("click", changeQuestion);
formEl.addEventListener("submit", saveScore);
scoreBtn.addEventListener("click", displayHighScores);
goBack.addEventListener("click", goBackToMenu);
document.getElementById("clear-highscores").addEventListener("click", clearHScore);