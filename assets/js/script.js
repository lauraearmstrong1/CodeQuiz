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

//function that saves the name to the local storage
var submit = document.getElementById("#submit");
var initials = document.getElementById("#initials");
submit.addEventListener("click", function(event) {
  event.preventDefault();
  initials.textContent = "High Score: " + initials;
  localStorage.setItem("initials", initials);
  renderLastRegistered(); //calling the last score function

});

function renderLastRegistered() {
  var times = localStorage.getItem("timerDom");
  times.value = timerDom;
  localStorage.getItem("Score", timer);
  localStorage.getItem("initials", initials);
  document.body.appendChild("times", timerDom);
  document.body.appendChild("initials", initials);
}

//WORKS WITHOUT ABOVE CODE


//function of what happens at the end of the game
function endGame() {
  clearInterval(timerInterval); //interval stops
  localStorage.setItem("score", timer); //save the time from the timer to the local storage
  window.location.href="highscore.html" //go to highscores page
  //saveName(); //calling function score to save initials
}

//function that keeps track of the time
function TimerCountdown() {
    timer-- //timer decreases by one 
    timerDom.textContent = "Time: "+ timer  //time displayed on the page
    if(timer === 0){
      endGame()
    }
}


//function that checks which number question the user is on
function checker(number) {
  //if the answer is wrong, deduct 10 seconds
  if(questions[questionNumber].choices[number] !== questions[questionNumber].answer){
    timer -= 10
  }
  //go to the next question
  questionNumber++
  //if the question is at the end (last question), then go to the function to end the game
  if(questionNumber === questions.length){
    endGame()
  }else{
    //if it's not the last question, then it asks the next question
    writeQuestion()
  }
}

//function that displays the questions
function writeQuestion (){
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
    button.textContent = (i+1)+": "+ questions[questionNumber].choices[i]
    button.setAttribute("onclick", "checker("+i+")")
    li.appendChild(button)
    ul.appendChild(li)
  }
  //appending the ul list to the title
  main.appendChild(ul)
}

//start the quiz by clicking the button
startQuiz.addEventListener("click", function() {
  //interval counts down by one second
  timerInterval = setInterval(TimerCountdown, 1000);
  //call on the function writeQuestion to display the questions
  writeQuestion()
})
