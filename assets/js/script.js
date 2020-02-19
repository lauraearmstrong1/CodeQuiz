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
var timer = 15 * questions.length  //timer set to 15 seconds per question, but given in total on the window
var timerDom = document.getElementById("timer");
var timerInterval;


//CODE BELOW MESSES UP THE QUIZ

function renderLastRegistered() {
  var times = localStorage.getItem("timerDom");
  times.value = timerDom;
  localStorage.getItem("Score", timer);
  
  document.body.appendChild("times", timerDom);
  document.body.appendChild("initials", initials);
}

//function that saves the name to the local storage


//WORKS WITHOUT ABOVE CODE
function submit(){

  var initials = document.getElementById("initials").value

    event.preventDefault();
    var local = localStorage.getItem("initials");
    local=  JSON.parse(local)
    if(!local){
      local = []
    }
    local.push({initials: initials, score: timer})
    localStorage.setItem("initials", JSON.stringify( local))
     window.location.href="highscore.html" //go to highscores page
    // initials.textContent = "High Score: " + initials;
    // localStorage.setItem("initials", initials);
    // renderLastRegistered(); //calling the last score function


}
function getIntials() {

  var intialsPage = '<h2>Highest Scores:</h2> <div class="form-group"><label for="exampleFormControlTextarea1" >Enter Initials:</label><textarea class="form-control" id="initials" rows="1"></textarea><button id="submit" onClick ="submit()">Submit</button></div>'

  main.innerHTML = intialsPage
}

//function of what happens at the end of the game
function endGame() {
  clearInterval(timerInterval); //interval stops

  getIntials()
  
}

//function that keeps track of the time
function TimerCountdown() {
  timer-- //timer decreases by one 
  timerDom.textContent = "Time: " + timer  //time displayed on the page
  if (timer === 0) {
    endGame()
  }
}


//function that checks which number question the user is on
function checker(number) {
  //if the answer is wrong, deduct 10 seconds
  if (questions[questionNumber].choices[number] !== questions[questionNumber].answer) {
    timer -= 10
  }
  //go to the next question
  questionNumber++
  //if the question is at the end (last question), then go to the function to end the game
  if (questionNumber === questions.length) {
    endGame()
  } else {
    //if it's not the last question, then it asks the next question
    writeQuestion()
  }
}

//function that displays the questions
function writeQuestion() {
  //var main defined at the top of page
  main.innerHTML = ""
  var title = document.createElement("h2")
  //title --> questions array starting at zero
  title.textContent = questions[questionNumber].title
  //appending the title to the body
  main.appendChild(title)
  var ul = document.createElement("ul")
  //list of questions added to the body
  ul.classList.add("list-unstyled")
  for (var i = 0; i < questions[questionNumber].choices.length; i++) {
    //list the choices that are in the "choices" array for each questions
    var li = document.createElement("li")
    var button = document.createElement("button")
    button.textContent = (i + 1) + ": " + questions[questionNumber].choices[i]
    button.setAttribute("onclick", "checker(" + i + ")")
    li.appendChild(button)
    ul.appendChild(li)
  }
  //appending the ul list to the title
  main.appendChild(ul)
}

//start the quiz by clicking the button
startQuiz.addEventListener("click", function () {
  //interval counts down by one second
  timerInterval = setInterval(TimerCountdown, 1000);
  //call on the function writeQuestion to display the questions
  writeQuestion()
})
