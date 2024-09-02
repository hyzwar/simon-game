var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(500);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(500);
  level++;
  $("h1").text("Level " + level);
}

$("[type='button']").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
});

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  var buttonPressed = $("#" + currentColour);
  buttonPressed.addClass("pressed");
  setTimeout(function () {
    buttonPressed.removeClass("pressed");
  }, 100);
}

$(document).one("keypress", function () {
  nextSequence();
});

function checkAnswer() {
  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    console.log("success");
    sequenceLength();
  } else {
    console.log("wrong");

    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    playSound("wrong");

    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $(document).on("keypress", function () {
      location.reload();
    });
  }
}

function sequenceLength() {
  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
}
