var character = document.getElementById("character");
var block = document.getElementById("block");
var playerScore = 0;

function jump() {
  if (!character.classList.contains("animate")) {
    character.classList.add("animate");
    // console.log(character.classList.item("animate"));
    setTimeout(function () {
      character.classList.remove("animate");
    }, 500);
  }
}

//// random spawn times WIP

// var doubleCallPrevention = true;

// block.addEventListener("animationiteration", (event) => {
//   if (doubleCallPrevention) {
//     console.log("event: " + event);
//     randomizedAnimationDuration(block);
//   }
//   doubleCallPrevention = !doubleCallPrevention;
// });

function randomizedAnimationDuration(element) {
  var randomDuration = Math.floor(Math.random() * 1500) + 1500; // Random duration between 500ms and 1500ms
  console.log("random duration: " + randomDuration);
  element.style.animationDuration = `${randomDuration}ms`;
}

var incScoreSwitch = true;

var checkDead = setInterval(function () {
  var characterBottom = parseInt(
    window.getComputedStyle(character).getPropertyValue("bottom")
  );
  var characterWidth = parseInt(
    window.getComputedStyle(character).getPropertyValue("width")
  );
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  var characterHeight = parseInt(
    window.getComputedStyle(character).getPropertyValue("height")
  );

  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  var blockWidth = parseInt(
    window.getComputedStyle(block).getPropertyValue("width")
  );
  var blockBottom = parseInt(
    window.getComputedStyle(block).getPropertyValue("bottom")
  );
  var blockHeight = parseInt(
    window.getComputedStyle(block).getPropertyValue("height")
  );

  // console.log(
  //   characterLeft +
  //     "..." +
  //     characterWidth +
  //     "..." +
  //     blockLeft +
  //     "..." +
  //     blockWidth +
  //     "..." +
  //     characterBottom +
  //     "..." +
  //     blockBottom +
  //     "..." +
  //     characterHeight +
  //     "..." +
  //     blockHeight
  // );

  function logicalLatchScoreSwitch() {
    if (incScoreSwitch) {
      incrementScore();
      incScoreSwitch = false;
    }
  }

  function handleLose() {
    block.style.animation = "none";
    block.style.display = "none";
    alert("u lose");
    incScoreSwitch = true;
  }

  if (
    blockLeft < characterLeft + characterWidth &&
    blockLeft > characterLeft &&
    characterBottom <= blockBottom + blockHeight
  ) {
    handleLose();
  } else if (
    blockLeft + blockWidth < characterLeft + characterWidth &&
    blockLeft + blockWidth > characterLeft &&
    characterBottom <= blockBottom + blockHeight
  ) {
    handleLose();
  } else if (
    blockLeft < characterLeft + characterWidth &&
    blockLeft > characterLeft &&
    characterBottom >= blockBottom + blockHeight
  ) {
    logicalLatchScoreSwitch();
  } else {
    incScoreSwitch = true;
  }
  console.log("inc score switch: " + incScoreSwitch);
}, 5);

var scoreElement = document.getElementById("score");

var scoreNumber = 0;

function incrementScore() {
  scoreNumber += 1;
}

var setScoreText = setInterval(function () {
  scoreElement.textContent = "Score: " + scoreNumber;
}, 5);

document.addEventListener("keydown", (event) => {
  console.log(event);
  if ((event.key = " ")) {
    jump();
  }
});
