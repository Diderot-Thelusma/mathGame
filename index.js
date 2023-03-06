$(document).ready(function() {
  // hide game elements on page load
  $("#game").hide();

  // show game elements when start button is clicked
  $("#start-btn").click(function() {
    $("#welcome").hide();
    $("#game").show();

    // start the game
    startGame();
  });
});

function startGame() {
  // set initial score and time
  let score = 0;
  let timeLeft = 10;

  // display first math equation
  displayMathEquation();

  // start the timer
  let timer = setInterval(function() {
    timeLeft--;
    $("#time").text(timeLeft);

    // end the game if time runs out
    if (timeLeft === 0) {
      endGame(score);
      clearInterval(timer);
    }
  }, 1000);

  // listen for user input
  $("#answer-input").on("keyup", function(event) {
    // check if user input is correct
    if ($("#answer-input").val() == eval($("#game h2").text())) {
      // add 1 second to time
      timeLeft++;
      $("#time").text(timeLeft);

      // update score and display new equation
      score++;
      $("#score").text(score);
      displayMathEquation();

      // clear input box
      $("#answer-input").val("");
    }
  });
}

function displayMathEquation() {
  // generate random numbers for equation
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  // display equation in h2 element
  $("#game h2").text(`${num1} + ${num2}`);
}

function endGame(score) {
  // show game over message and restart button
  $("#game").html(`<h2>Game Over</h2><p>Your final score is ${score}.</p><button id="restart-btn">Restart Game</button>`);

  // listen for restart button click
  $("#restart-btn").click(function() {
    // reload the page
    location.reload();
  });
}
