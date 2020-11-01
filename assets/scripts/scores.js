var restartBtn = document.getElementById("restartBtn");
var clearBtn = document.getElementById("clearBtn");
var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
var scoreList = document.getElementById("score-list");

// Leaderboard sorting
highScores.sort(function (a, b) {
    return b.score - a.score
})

// leaderboard display
for (var i = 0; i < highScores.length; i++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[i].name + " - " + highScores[i].score
    scoreList.appendChild(newLi)
}

// event listener for leaderboard
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});