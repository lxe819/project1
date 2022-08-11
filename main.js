import $ from "jquery";

import lotso from "./characters/Lotso_red.png"
import pooh from "./characters/Pooh_yellow.png"
import alien from "./characters/ThreeEyedAlien_green.png"
import genie from "./characters/Genie_blue.png"
import ursula from "./characters/Ursula_purple.png"
import baymax from "./characters/Baymax_white.png"


// Dimensions of the board 8x8 
  const width = 8;

  
  
/* ============================================================ */
/* THE STATE */
/* ============================================================ */

  const game = {
    message: "Congratulations on reaching 1000 points!", 
    points: {
      threePoints: 3, 
      fourPoints: 4, 
      fivePoints: 5
    }, 
    characters: [
      `url(${lotso})`, 
      `url(${pooh})`, 
      `url(${alien})`, 
      `url(${genie})`, 
      `url(${ursula})`, 
      `url(${baymax})`
    ], 
    score: 0, 
    board: [
      [1, 1, 1, 4, 5, 6, 5, 1], 
      [2, 1, 3, 3, 4, 6, 5, 6], 
      [4, 5, 6, 3, 5, 1, 4, 4], 
      [2, 4, 5, 6, 1, 2, 5, 2], 
      [5, 6, 2, 1, 2, 4, 2, 4], 
      [1, 1, 2, 4, 1, 2, 2, 4], 
      [1, 2, 3, 4, 6, 2, 4, 4], 
      [3, 5, 3, 6, 5, 2, 1, 1]
    ], 
    isLoopDone: true, 
    firstClick: {
      firstClickId: "", 
      firstIdSplit: "", 
      c1RowNum: "", 
      c1ColNum: "", 
      firstImg: "", 
    }, 
    secondClick: {
      secondClickId: "", 
      secondIdSplit: "", 
      c2RowNum: "", 
      c2ColNum: "", 
      secondImg: "", 
    }, 
  }




/* ============================================================ */
/* RENDER - Update Board */
/* ============================================================ */

  const updateBoard = () => {
    for (let i=0; i<game.board.length; i++){
      for (let j=0; j<game.board.length; j++){
        const imageIndex = game.board[i][j] - 1; 
        $("#r" + i + "c" + j).css("background-image", game.characters[imageIndex]); 
      }
    }
    $("#score-box").text("Score: " + `${game.score}`);
  }

  // const updateScore = () => {
  //   $("#score-box").text("Score:", game.score);
  // }


/* ============================================================ */
/* CHECK for WINS */
/* ============================================================ */

// Check for ROWS

const checkRows = () => {

  for (const row of game.board){
    for (let i=0; i<row.length-2; i++){
      if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3] && row[i] === row[i+4]){
        game.score += game.points.fivePoints; 
        row[i] = 0; 
        row[i+1] = 0; 
        row[i+2] = 0; 
        row[i+3] = 0; 
        row[i+4] = 0; 
      } else if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
        game.score += game.points.fourPoints; 
        row[i] = 0; 
        row[i+1] = 0; 
        row[i+2] = 0; 
        row[i+3] = 0; 
      } else if (row[i] === row[i+1] && row[i] === row[i+2]){
        game.score += game.points.threePoints; 
        row[i] = 0; 
        row[i+1] = 0; 
        row[i+2] = 0; 
      }
    }
  }

}

      
  // console.log(game.board);



// Check for COLUMNS

  const transpose = (testT) => {
    return testT[0].map((col, c) =>
      testT.map((row, r) => testT[r][c])
    );
  };

  const checkColumns = () => {

    const transposedBoard = transpose(game.board); 
    
    for (const row of transposedBoard){
      for (let i=0; i<row.length-2; i++){
        if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3] && row[i] === row[i+4]){
          game.score += game.points.fivePoints; 
          row[i] = 0; 
          row[i+1] = 0; 
          row[i+2] = 0; 
          row[i+3] = 0; 
          row[i+4] = 0; 
        } else if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
          game.score += game.points.fourPoints; 
          row[i] = 0; 
          row[i+1] = 0; 
          row[i+2] = 0; 
          row[i+3] = 0; 
        } else if (row[i] === row[i+1] && row[i] === row[i+2]){
          game.score += game.points.threePoints; 
          row[i] = 0; 
          row[i+1] = 0; 
          row[i+2] = 0; 
        }
      }
    }

    game.board = transpose(transposedBoard); 

  }




/* ============================================================ */
/* FILLING UP the Squares */
/* ============================================================ */

const testBoard = [
  [1, 0, 0, 0, 1, 6, 5, 2], 
  [2, 1, 3, 3, 4, 6, 5, 5], 
  [4, 5, 6, 3, 5, 1, 4, 7], 
  [2, 4, 5, 3, 1, 2, 5, 0], 
  [5, 6, 2, 1, 1, 4, 2, 0], 
  [1, 1, 2, 4, 1, 2, 2, 0], 
  [1, 2, 3, 4, 6, 2, 4, 4], 
  [3, 5, 3, 6, 0, 0, 0, 1]
]


const randomN = () => {
  return Math.floor(Math.random()*game.characters.length)+1;
}


const count = () => {
  let counter = 0; 
  for (const row of game.board){
    for (const num of row){
      if (num !== 0){
        counter += 1; 
      } else {
        counter += 0;
      }
    }
  }

  return counter; 

}





const countZero = () => {
  const arrOfZeroes = []; 
  const transposedArr = transpose(game.board); 
  for (const row of transposedArr){
      const countZero = row.filter(element => element === 0).length; 
      arrOfZeroes.push(countZero); 
  }
  return arrOfZeroes; 
}
// const countZeroArr = countZero();
// console.log("Count zero array:", countZeroArr);


const firstZero = () => {
  const firstZeroIndex = []; 
  const transposedArr = transpose(game.board); 
  // console.log("Before reverse:", transposedArr);

  for (const row of transposedArr){
      row.reverse(); 
  }

  // console.log("After reverse:", transposedArr);

  for (const row of transposedArr){
      const firstZero = row.findIndex(element => element === 0);
      // console.log(firstZero);
      firstZeroIndex.push(firstZero)
  }
  // console.log(firstZeroIndex);
  const test = firstZeroIndex.map(x => (width-1)-x);
  // console.log(test);
  return test; 

 
}
// const firstZeroArr = firstZero(); 
// console.log("First zero array:", firstZeroArr);


const fillUpSquares = () => {

  let notDone = true; 
  while (notDone){

    // console.log("Before counting zero:", game.board);


    const countZeroArr = countZero();
    // console.log("Count zero array:", countZeroArr);

    const firstZeroArr = firstZero(); 
    // console.log("First zero array:", firstZeroArr);


    for (let i=0; i<game.board.length; i++){
      for (let j=firstZeroArr[i]; j>=0; j--){
          // const numOfZero = countZeroArr[i]; 
          // console.log("After every round: " + i + " --> " + game.board);
    
        if (firstZeroArr[i] > (width-1)){        
              continue;
        } else if (j !== 0){
              game.board[j][i] = game.board[j-1][i];    
          } else if (j === 0){
              game.board[j][i] = randomN();                
          }
      }
    }
    // console.log("I'm done filling up the squares!");

    checkRows(); 
    checkColumns(); 

    const test = count(); 
    // console.log(test);

    if (test === 64){
      notDone = false;
    }

  }

  updateBoard(); 
  game.isLoopDone = true; 

}
          




/* ============================================================ */
/* CREATING the BOARD */
/* ============================================================ */


// Creating the 8x8 board
  const createSquares = () => {
    for (let i = 0; i < game.board.length; i++) {
      const row = $("<div>").addClass("row "+ `${i}`);
      $("#right-portion").append(row);
      for (let j = 0; j < game.board.length; j++) {
        let randomNum = Math.floor(Math.random()*game.characters.length); 
        game.board[i][j] = randomNum+1; 
        
        const square = $("<div>").addClass("square").attr("id", "r"+`${i}`+"c"+ `${j}`).css("background-image", game.characters[game.board[i][j]-1]); 
        row.append(square);
        // console.log(square);
        // console.log(square);

      }
    }

    // console.log("Created board before checks:", game.board);

    checkRows(); 
    checkColumns(); 

    fillUpSquares(); 
    // updateBoard(); 
    // console.log("Game board after checks", game.board);

    game.score = 0; 
    updateBoard();
  };

  createSquares();

  // console.log("Game board after div creation", game.board); 




/* ============================================================ */
/* CLICKING + SWAPPING the Squares */
/* ============================================================ */


    const isValidClick = (c1RowNum, c1ColNum, c2RowNum, c2ColNum) => {
      if ((c2RowNum === c1RowNum && c2ColNum === c1ColNum-1) || (c2RowNum === c1RowNum && c2ColNum === c1ColNum+1) || (c2RowNum === c1RowNum-1 && c2ColNum === c1ColNum) || (c2RowNum === c1RowNum+1 && c2ColNum === c1ColNum)){
        return true; 
      } else {
        return false; 
      }
    }




    const main = () => {
      $(".square").on("click", (event) => {
        if (game.isLoopDone === true){
          
          // Saving first click's ID
          game.firstClick.firstClickId = $(event.target)["0"].id; 
 
          // Splitting ID string to extract out row number and column number 
          game.firstClick.firstIdSplit = game.firstClick.firstClickId.split(""); 
          game.firstClick.c1RowNum = parseInt(game.firstClick.firstIdSplit[1]); 
          game.firstClick.c1ColNum = parseInt(game.firstClick.firstIdSplit[3]);

          // Saving first click's image/character
          game.firstClick.firstImg = game.board[game.firstClick.c1RowNum][game.firstClick.c1ColNum]; 


              console.log("First Clicked ID:", game.firstClick.firstClickId);
              // console.log("First click image:", game.firstClick.firstImg)
              // console.log("First click ROW num:", game.firstClick.c1RowNum);
              // console.log("First click COL num:", game.firstClick.c1ColNum);

          // Changing boolean to false so the next click will be identified as second click
          game.isLoopDone = false; 

        } else {

          // Saving second click's ID
          game.secondClick.secondClickId = $(event.target)["0"].id; 

          // Splitting ID string to extract out row number and column number 
          game.secondClick.secondIdSplit = game.secondClick.secondClickId.split(""); 
          game.secondClick.c2RowNum = parseInt(game.secondClick.secondIdSplit[1]); 
          game.secondClick.c2ColNum = parseInt(game.secondClick.secondIdSplit[3]);


          // Saving second click's image/character
          game.secondClick.secondImg = game.board[game.secondClick.c2RowNum][game.secondClick.c2ColNum]; 

              console.log("Second Clicked ID:", game.secondClick.secondClickId);
              // console.log("Second click image", game.secondClick.secondImg);
              // console.log("Second click ROW num:", game.secondClick.c2RowNum);
              // console.log("Second click COL num:", game.secondClick.c2ColNum);
              

          // Checking to see if second click belongs to either top, bottom, left, or right of first click. 
          if (isValidClick(game.firstClick.c1RowNum, game.firstClick.c1ColNum, game.secondClick.c2RowNum, game.secondClick.c2ColNum)){

            // If valid, second click's image will swap with first click's image. 
            game.board[game.firstClick.c1RowNum][game.firstClick.c1ColNum] = game.secondClick.secondImg; 
            game.board[game.secondClick.c2RowNum][game.secondClick.c2ColNum] = game.firstClick.firstImg; 

            updateBoard(); 

            console.log("I'm swapped!");


            // Check for wins
            checkRows(); 
            checkColumns(); 
            fillUpSquares(); 

            console.log("I'm checked!");

            // Changing boolean to true so the next click will be registered as first click. 
            // game.isLoopDone = true; 

            // console.log("Game board after a move", game.board);

          } else {

            // Boolean will remain as false so the next click will still be second click. 
            game.isLoopDone = false; 

          }
        }

        console.log("Your score is:", game.score);
        updateBoard();

        // if (game.score >= 100){
        //   let userResponse = prompt("You've won! \n If you wish to continue the game, type 'c'. \n If you wish to restart the game, type 'r'."); 

        //   if (userResponse === "c"){
        //     main(); 
        //   } else if (userResponse === "r"){
        //     $("#right-portion").empty(); 
        //     createSquares(); 
        //     main(); 
        //   }
        // }

        if (game.score >= 100){
          alert("You've won! \nClick 'OK' if you wish to restart the game. \nThanks for playing!");
          $("#right-portion").empty(); 
          createSquares(); 
          main();
        }

      })
    }
    main();



