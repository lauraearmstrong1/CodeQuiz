var highScore = document.getElementById("highScores")

var clearScores = document.getElementById("clearScores")
clearScores.addEventListener("click", function () {
    localStorage.clear()
    render()
})

function render() {

    var initials = localStorage.getItem("initials");
    initials = JSON.parse(initials)

    if(initials){
        initials.sort(function (a, b) { return b.score - a.score });
        var newUL = document.createElement("ul")
        newUL.setAttribute("class", "list-unstyled")
        for (let i = 0; i < initials.length; i++) {
            var newLI = document.createElement("li")
            newLI.textContent = (i + 1) + ": " + initials[i].initials + " " + initials[i].score
            newUL.appendChild(newLI)
        }
        highScore.appendChild(newUL)
    }
    else{
        highScore.textContent = "No high scores!!"
    }
}
render()