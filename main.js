import $ from "jquery";
import lotso from "./characters/Lotso_red.png"
import pooh from "./characters/Pooh_yellow.png"
import alien from "./characters/ThreeEyedAlien_green.png"
import genie from "./characters/Genie_blue.png"
import ursula from "./characters/Ursula_purple.png"
import baymax from "./characters/Baymax_white.png"

// Dimensions of the board 8x8 
  const width = 8;

  
  
// The constants / state in the game?
  // Not sure if I should be putting "characters" inside this state variable, since it's not going to change. It's really just a constant thing. 
  
  const game = {
    message: "Congratulations on reaching 1000 points!", 
    points: {
      threePoints: 30, 
      fourPoints: 45, 
      fivePoints: 60
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
    ]
  }


// DRAGGING of square
  // Need to ensure that the square can only swap position with (be dragged to) another square that is to the left, right, top, and bottom of itself. 
    // If all the squares are inside just 1 array, i.e. not arrays of arrays, where the array.length = 64, then it's easier because I just have to enable dragging to left: left:[i-1], right:[i+1], top:[i-width], bottom:[i+width]. 
    // If we are doing array of arrays (as above), then it will be [i-1], [i+1], previous array[i], next array[i]. Not sure how to loop(?) like this. 



// Checking for WINS
  // For ROWS
    // For rows of 3
      for (const row of game.board){
        for (let i=0; i<row.length-2; i++){
          if (row[i] === row[i+1] && row[i] === row[i+2]){
            game.score += game.points.threePoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
          } 
        }
      }

    // Trying to combine the check for rows, be it row of 5, 4, or 3. 
      for (const row of game.board){
        for (let i=0; i<row.length-2; i++){
          if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3] && row[i] === row[i+4]){
            score += game.points.fivePoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
            row[i+3] = null; 
            row[i+4] = null; 
          } else if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
            score += game.points.fourPoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
            row[i+3] = null; 
          } else if (row[i] === row[i+1] && row[i] === row[i+2]){
            game.score += game.points.threePoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
          }
        }
      }


  // For COLUMNS
    // Extracting columns 
      const extractCol = (colNum) => {
        const colArray = []; 
        for (let i=0; i<game.board.length; i++){
          const x = game.board[i][colNum];
          colArray.push(x); 
          return colArray; 
        }
      }

      const colArrayTgt = []; 
      for (let i=0; i<game.board.length; i++){
        colArrayTgt.push(extractCol(i));
      }
      
    //? This "row" is game.board's column. 
      for (const row of colArrayTgt){
        for (let i=0; i<row.length-2; i++){
          if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3] && row[i] === row[i+4]){
            score += game.points.fivePoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
            row[i+3] = null; 
            row[i+4] = null; 
          } else if (row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row[i+3]){
            score += game.points.fourPoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
            row[i+3] = null; 
          } else if (row[i] === row[i+1] && row[i] === row[i+2]){
            score += game.points.threePoints; 
            row[i] = null; 
            row[i+1] = null; 
            row[i+2] = null; 
          }
        }
      }


// Replacing the squares after wins 
  // Need the square to drop down the columns. 
        // for (const row of array){
        //   for (let i=0; i<row.length; i++){
        //     if (row[i] === null){
              // Take the value of of its above row, (row-1)[i]; 
                // Easier if it's not array of arrays, if it's just single array, can just use (i-width)
        //     } if (it's the first row){
        //       row[i] = game.characters[randomNum]
        //     }
        //   }
        // }



// Creating the 8x8 board
  const createSquares = () => {
    for (let i = 0; i < width; i++) {
      const row = $("<div>").addClass("row");
      $("#right-portion").append(row);
      for (let j = 0; j < width; j++) {
        let randomNum = Math.floor(Math.random()*game.characters.length); 
        game.board[i].push(randomNum); 
        
        const square = $("<div>").addClass("square").css("background-image", game.characters[randomNum]); 
        row.append(square);
        // console.log(square);


      }
    }
  };

  createSquares();


  console.log(game.board); //! What appears is the fake test board above. 

