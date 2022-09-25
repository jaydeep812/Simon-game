var userClickedPattern =  [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function playMusic(name){
var address ="sounds/"+name+".mp3";
var sound = new Audio(address);
sound.play();
}

$(".btn").on("click",function(event){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playMusic(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playMusic(randomChosenColor);
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(() => { $("."+currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(nextSequence,1000);
      userClickedPattern=[];
    }
  }
  else{
    var wrongmusic = new Audio("sounds/wrong.mp3");
    wrongmusic.play();
    $("body").addClass("game-over");
    setTimeout(() => {$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
