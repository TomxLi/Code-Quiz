var secondsLeft = 100;
var start = document.getElementById("start");
var timer = document.getElementById("timer");
var userScore = document.getElementById("userscore");
var question = document.getElementById("questions");
var answerOption = document.getElementById("answers");
var submit = document.getElementById("submit")
var userinitial;
var questionNumber = -1;
var answer;

//questions are from https://www.w3schools.com/js/js_quiz.asp
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<javascript>", "<js>", "<scripting>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        options: ["The <body> section", "The <head> section", "Both the <head> section and the <body> section are correct"],
        answer: "Both the <head> section and the <body> section are correct"
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        options: ["False", "True"],
        answer: "False"
    },
    {
        title: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "How to write an IF statement in JavaScript?",
        options: ["if (i == 5)", "if i = 5 then", "if i = 5", "if i == 5 then"],
        answer: "if (i == 5)"
    },
  ];
//event listener for "start challenge button"
start.addEventListener("click", startGame);

//when button clicked - intro page will disapear, Q&A page will show, and Timer will start
function startGame() {
    document.getElementById("main").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');
    startTimer();
    startQuiz();
}
//start countdown, if times up or questions finished, show scorepage
function startTimer() {
    var countdown = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time:" + secondsLeft;

        if (secondsLeft <= 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            displayScore();
        }
    }, 1000);
}
//provides quiz by pulling from question pool, and creat button for the options
function startQuiz() {
    questionNumber++;
    answer = questions[questionNumber].answer;
    question.textContent = questions[questionNumber].title;
    answerOption.innerHTML = "";
    var options = questions[questionNumber].options;
    for (var q = 0; q < options.length; q++) {
        var choice = document.createElement("button");
        choice.textContent = options[q];
        answerBtn = answerOption.appendChild(choice).setAttribute("class", "btn btn-info btn-block mt-3");
    }
}

//When game ends, hide quiz, shows final score board by add and remove d-none tag
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("finalscore").classList.remove('d-none');
    userScore.textContent = "Your Score is: " + secondsLeft + ".";
}

//event listener for submit button in final score page
submit.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    window.location.href = 'ranking.html'
});

//create new array of strings which contains username and score, push into local storage 
function addScore () {
    userinitial = document.getElementById("userName").value
    var newScore = {
        name: userinitial,
        score: secondsLeft
    };
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerOption.addEventListener("click", function (event) {
    var pElement = document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer options & feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "Correct";
        setTimeout(hideFeedback,500);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "WRONG";
        setTimeout(hideFeedback,500);
        secondsLeft = secondsLeft - 20;
        showFeedback();
    }    
    startQuiz();
});