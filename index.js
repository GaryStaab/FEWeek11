var currentPlayer = "X";
// I don't like the use of the placeHolder but that is the road I went down...
var placeHolder = "_";
var gameFinished = false;

function displayPlayer() {
  $("#currentPlayer").text(`Current Player: ${currentPlayer}`);
}

function displayGameEnd(gameStatus) {
  if (gameStatus !== "") {
    $(".jumbotron").show();
    $(".jumbotron2").hide();
    $("#gameStatus").text(`Game Over: ${gameStatus}`);
  } else {
    $(".jumbotron").hide();
    $(".jumbotron2").show();
    $("#gameStatus").text(``);
  }
}

function resetCells() {
  $(".gameCell").text(placeHolder);
};

function resetGame() {
  currentPlayer = "X";
  gameFinished = false;
  resetCells()
  displayGameEnd("");
  displayPlayer();
}

function checkWinner() {
  // use loops jquery and template literals to look for draw / active game / winner

  // set to draw first
  let gameStatus = "Draw";

  // check if not draw
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      if ($(`#cell-${i}-${j}`).text() === placeHolder) {
        gameStatus = "active";
      }
    }
  }

  // check winner on columns & rows
  for (let i = 1; i <= 3; i++) {
    // check rows
    if ($(`#cell-${i}-1`).text() !== placeHolder &&
      $(`#cell-${i}-1`).text() === $(`#cell-${i}-2`).text() &&
      $(`#cell-${i}-1`).text() === $(`#cell-${i}-3`).text()
    ) {
      gameStatus = `${$(`#cell-${i}-1`).text()} won!`
    }
    // check colums
    if ($(`#cell-1-${i}`).text() !== placeHolder &&
      $(`#cell-1-${i}`).text() === $(`#cell-2-${i}`).text() &&
      $(`#cell-1-${i}`).text() === $(`#cell-3-${i}`).text()
    ) {
      gameStatus = `${$(`#cell-1-${i}`).text()} won!`
    }
  }
  // check diagonal 1
  if ($(`#cell-1-1`).text() !== placeHolder &&
    $(`#cell-1-1`).text() === $(`#cell-2-2`).text() &&
    $(`#cell-1-1`).text() === $(`#cell-3-3`).text()
  ) {
    gameStatus = `${$(`#cell-1-1`).text()} won!`
  }
  // check diagonal 2
  if ($(`#cell-1-3`).text() !== placeHolder &&
    $(`#cell-1-3`).text() === $(`#cell-2-2`).text() &&
    $(`#cell-1-3`).text() === $(`#cell-3-1`).text()
  ) {
    gameStatus = `${$(`#cell-1-3`).text()} won!`
  }
  if (gameStatus !== "active") {
    gameFinished = true;
    displayGameEnd(gameStatus);
  }
  //console.log(gameStatus);
}

$(".gameCell").click(function () {
  // console.log(gameFinished);
  if (this.innerHTML === placeHolder && !gameFinished) {
    this.innerHTML = currentPlayer;
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    };
    displayPlayer();
    checkWinner();
  };
});

resetGame();