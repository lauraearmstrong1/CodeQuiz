//click start button
//timer starts and i'm presented with a question
//answer and then another question
//when i'm incorrect, time is subtracted from the clock
//when all questions are answered or the timer reaches 0 then the game is over
//and my time and initials are scored

var startQuiz = document.querySelector("#startQuiz")
var main = document.getElementById("main")
var questionNumber = 0
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
    "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];
var timer = 15 * questions.length

//Need help with the high score
var highestScores = document.getElementById("highScore")

function renderLastRegistered() {
  var initials = localStorage.getItem("initials");
  var times = localStorage.getItem("timerDom");
  var score = localStorage.getItem("current-score")
  Submit.textContent = initials;
  timerDom.value = times;
  document.appendChild("Highest Scores", timerDom);
}

function score() {
  localStorage.setItem("timerDom", highestScores);
  localStorage.setItem("initials", initials);
  localStorage.setItem("current-score", timer)
}
//
var timerDom = document.getElementById("timer");
var timerInterval;
function endGame() {
  clearInterval(timerInterval)
  window.location.href="highscore.html"
}
  console.log("game over")

function TimerCountdown() {
    timer--
    timerDom.textContent = "Time: "+ timer
    if(timer === 0){
      endGame()
    }
}
function checker(number) {
  console.log(number)
  if(questions[questionNumber].choices[number] !== questions[questionNumber].answer){
    timer -= 10
  }
  questionNumber++
  if(questionNumber === questions.length){
    endGame()
  }else{
    writeQuestion()
  }
}
function writeQuestion (){
  main.innerHTML = ""
  var title = document.createElement("h2")
  title.textContent = questions[questionNumber].title
  main.appendChild(title)
  var ul = document.createElement("ul")
  ul.classList.add("list-unstyled")
  for (var i = 0; i < questions[questionNumber].choices.length; i++) {
    var li = document.createElement("li")
    var button = document.createElement("button")
    button.textContent = (i+1)+": "+ questions[questionNumber].choices[i]
    button.setAttribute("onclick", "checker("+i+")")
    li.appendChild(button)
    ul.appendChild(li)
  }
  console.log(ul)
  main.appendChild(ul)
}
startQuiz.addEventListener("click", function() {
  timerInterval = setInterval(TimerCountdown, 1000);
  writeQuestion()
})
