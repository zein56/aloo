let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let playerTurn = 1

function Player(sq){
    if (playerTurn) {
        
        if (!board[sq[0]][sq[1]]) {
            board[sq[0]][sq[1]] = "X"
            console.log(board)
            PrintBoard()
            if (Result() == -2) {
                setTimeout(function(){
                    alert("X wins!")
                    location.reload()
                },100)
                
            }
            if (Result() == 1) {
                setTimeout(function(){
                    alert("draw!")
                    location.reload()
                },100)
                return 0
            }
            
           Bot()
        }else{
            return 0
        }
    }else{
        alert("not your turn!!")
    }
    playerTurn = 1
}
function Bot(){
     setTimeout(function(){
    },500)
    BestMove(7, true, true);
    PrintBoard();
    if (Result() == 2) {
        setTimeout(function(){
            alert("O wins!")
            location.reload()
        },100)
    }
    if (Result() == 1) {
        setTimeout(function(){
            alert("draw!")
            location.reload()
        },100)
        return 0
    }
}
function PrintBoard(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j]) {
                document.getElementById(i+String(j)).innerHTML = board[i][j]   
            }
        }   
    }
}
function BestMove(loop,isBot,first){
    if (loop == 0 || Result() !== 0) {
        return Result();
    }
    if (isBot) {
        let max = -10
        let bestMove = null
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = "O"
                    let score = BestMove(loop-1,false,false)
                    
                    board[i][j] = 0
                    //max = Math.max(max,score)
                    if (score>max) {
                        max = score
                        bestMove = [i, j];
                    }
                    if (first) {
                        console.log(i,j,"  ",score);
                    }
                    //console.log(i,j,"  ",score);

                }
            }   
        }
        if (first && bestMove) {
            board[bestMove[0]][bestMove[1]] = "O";
        }
        return max
    }else{
        let min = 10
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = "X"
                    let score = BestMove(loop-1,true,false)
                    board[i][j] = 0
                    min = Math.min(min,score)
                }
            }   
        }
        return min
    }
}
function Result() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
            return board[i][0] == "O" ? 2 : -2;
        }
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) {
            return board[0][i] == "O" ? 2 : -2;
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
        return board[0][0] == "O" ? 2 : -2;
    }
    if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != 0) {
        return board[2][0] == "O" ? 2 : -2;
    }
    if (!board[0].includes(0) && !board[1].includes(0) && !board[2].includes(0)) {
        return 1;
    }
    return 0;
}
