var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var clicked = false;
var level = 0;

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  annimatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function annimatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(document).keypress(function(e){
  if(clicked === false){
  level = 0;
  $("h1").text("Level " + level);
  nextSequence();
  clicked = true;
}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
      }, 1000);
      $("h1").text("Game Over, Press Any Key to Restart");
      clicked = false;
      gamePattern = [];
  }

}
