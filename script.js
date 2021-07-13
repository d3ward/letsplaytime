function navbar() {
    var t = this;
    t.n = document.querySelector("nav");
    t.bo = document.body.style.overflow;
    t.close = function () {
        t.bo = "auto";
        t.n.classList.remove("active");
    }
    t.open = function () {
        t.bo = "hidden";
        t.n.classList.add("active");
    }
    if (t.n) {
        document.querySelector("nav>button").addEventListener("click", function () {
            if (t.n.classList.contains("active"))
                t.close();
            else
                t.open();
        });
        document.querySelectorAll("nav ul > a").forEach(n => n.addEventListener("click", t.close()));
    }
}

function modal(id) {
    var t = this;
    t.m = document.querySelector((id) ? id : '.modal');
    if (t.m) {
        t.c4_boardy = document.body.classList;
        t.targets = document.querySelectorAll('[data-toggle="' + t.m.id + '"]');
        t.closebtns = t.m.querySelectorAll('.close-modal');
    }
    t.show = function () {
        t.c4_boardy.add('_overflowhidden');
        t.m.classList.add('_show-modal');
    }
    t.hide = function () {
        t.m.classList.remove('_show-modal');
        t.c4_boardy.remove('_overflowhidden');
    }
    t.listeners = function () {
        t.targets.forEach(el => {
            el.addEventListener('click', function (e) {
                t.show();
            });
        });
        t.closebtns.forEach(function (item) {
            item.addEventListener('click', function (e) {
                t.hide();
            });
        });
    }
    if (t.m)
        t.listeners();
}

function themeManager() {
    const t = this;
    t.toggles = document.getElementsByClassName("theme-toggle");
    t.activeTheme = "light";
    t.setTheme = (theme) => {
        t.activeTheme = theme;
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme);
    }
    t.dark = () => {
        t.setTheme("dark");
    }
    t.light = () => {
        t.setTheme("light");
    }
    if (window.CSS && CSS.supports("color", "var(--bg)") && t.toggles) {
        var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ?
            "dark" : "light");
        if (storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)
        for (var i = 0; i < t.toggles.length; i++) {
            t.toggles[i].onclick = function () {
                if (document.documentElement.getAttribute("data-theme") === "light") t.dark();
                else t.light();
            };
        }
    }
}

function aos() {
    const t = this;
    t.items = document.querySelectorAll("[class*=_aos]");
    if (IntersectionObserver && t.items) {
        let callback = function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('_aos-done')) {
                    entry.target.classList.add('_aos-done');
                } else {
                    entry.target.classList.remove('_aos-done');
                }
            });
        }
        let observer = new IntersectionObserver(callback, {
            root: null,
            threshold: 0.1
        });
        t.items.forEach((item) => {
            observer.observe(item);
        });
    }
}

function gotop() {
    var t = this;
    t.gt = document.getElementById('gt-link');
    t.scrollToTop = function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    t.listeners = function () {
        window.addEventListener("scroll", () => {
            let y = window.scrollY;
            if (y > 0) {
                t.gt.classList.remove("hidden");
            } else {
                t.gt.classList.add("hidden");
            }
        });
        t.gt.onclick = function (e) {
            e.preventDefault();
            if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
                t.scrollToTop();
            }
        }
    }
    if (t.gt) {
        t.listeners();
    }
}

function pagesRoute() {
    var t = this;
    const notFoundPage = document.querySelector("#notFound");
    t.links = Array.from(document.querySelectorAll('[topage]'));
    t.scrollTop = () => {
        document.querySelector('html').scrollTop = 0;
        document.querySelector('body').scrollTop = 0;
    }
    t.navigate = (id) => {
        //Hide current active page
        var activePage = document.querySelector("section.page-active");
        if (activePage) activePage.classList.remove("page-active");
        var activeLink = document.querySelector('[topage].active');
        if (activeLink) activeLink.classList.remove("active");
        //Show the next page
        var nextPage = document.querySelector(id);
        if (nextPage) nextPage.classList.add("page-active");
        var nextLink = document.querySelector("[topage='" + id + "']");
        if (nextLink) nextLink.classList.add("active");
        //Scroll to top
        t.scrollTop();
        //Set history state
        if (history.pushState)
            history.pushState(null, null, id);
        else
            location.hash = id;
    }
    t.listeners = () => {
        t.links.forEach((page) => {
            var id = page.getAttribute("topage");
            page.addEventListener('click', () => {
                t.navigate(id)
            });
        })
    }
    if (t.links) {
        if (window.location.hash)
            t.navigate(window.location.hash);
        t.listeners();
    }
}

var setScale = (el) => {
    if (window.innerWidth < 430) {
        el.style.transform = `scale(${window.innerWidth/430})`;
    } else {
        el.style.transform = "scale(1)";
    }
}


function Tris() {
    var board;
    //localStorage.setItem("p1Score", 0);
    //   localStorage.setItem("p2Score", 0);
    var p1Score = 0;
    var p2Score = 0;
    const vsAI = true;
    const huPlayer = 'X';
    const aiPlayer = 'O';
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    const strikeline = document.querySelector(".strike");
    const root = document.querySelector(':root');
    const flipCard = document.querySelector('#tris .flip-card');
    const player1 = document.querySelector("#tris .player1");
    const player2 = document.querySelector("#tris .player2");
    const winnerShape = document.querySelector('.winner .shape');
    const winORdrawText = document.querySelector(".winner p");
    const cells = document.querySelectorAll(".tris_table>div");
    const tris_grid = document.querySelector(".tris_grid");
   
    var strikethrough = (index) => {
        switch (index) {
            case 0:
                strikeline.style.left = "-10px";
                strikeline.style.top = "15%";
                strikeline.style.transform = "rotate(0deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 1:
                strikeline.style.left = "-10px";
                strikeline.style.top = "49%";
                strikeline.style.transform = "rotate(0deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 2:
                strikeline.style.left = "-10px";
                strikeline.style.top = "82%";
                strikeline.style.transform = "rotate(0deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 3:
                strikeline.style.left = "16.5%";
                strikeline.style.top = "-12px";
                strikeline.style.transform = "rotate(90deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 4:
                strikeline.style.left = "50%";
                strikeline.style.top = "-12px";
                strikeline.style.transform = "rotate(90deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 5:
                strikeline.style.left = "83.5%";
                strikeline.style.top = "-12px";
                strikeline.style.transform = "rotate(90deg)";
                root.style.setProperty('--diagonal', 'initial');
                break;
            case 6:
                strikeline.style.left = "4px";
                strikeline.style.top = "0px";
                strikeline.style.transform = "rotate(45deg)";
                root.style.setProperty('--diagonal', '415px');
                break;
            case 7:
                strikeline.style.left = "98.8%";
                strikeline.style.top = "0px";
                strikeline.style.transform = "rotate(135deg)";
                root.style.setProperty('--diagonal', '415px');
                break;
        }
        strikeline.classList.add("active");
    } 
    var playAgain = () => {
        clearGrid();
        flipCard.classList.remove("active");
    }
    var resetScore = () => {
        clearGrid();
        localStorage.setItem("p1Score", 0);
        localStorage.setItem("p2Score", 0);
        p1Score = 0;
        p2Score = 0;
        changeDivScoreValues();
    }
    var changeDivScoreValues = () => {
        player1.innerHTML = p1Score;
        player2.innerHTML = p2Score;
    }
    var blockAllbtns = () => {
        cells.forEach(function (e) {
            e.style.pointerEvents = 'none';
        })
    }

    var updateScore = (player) => {
        winORdrawText.innerHTML = "Winner!";
        player == huPlayer ? player1.innerHTML = p1Score : player2.innerHTML = p2Score;
        localStorage.setItem("p1Score", p1Score);
        localStorage.setItem("p2Score", p2Score);
        blockAllbtns();
    }
    
    var startGame = () => {
        board = Array.from(Array(9).keys());
        if (p1Score == null && p2Score == null) {
            p1Score = 0;
            p2Score = 0;
        }
        changeDivScoreValues();
        setScale(tris_grid);
        cells.forEach(function (el, index) {
            el.addEventListener("click", () => {
                turnClick(index);
            })
        });
        document.querySelector("#tris .again").onclick = () => {
            playAgain()
        };
        document.querySelector("#tris .clear").onclick = () => {
            clearGrid()
        };
        document.querySelector("#tris .reset").onclick = () => {
            resetScore()
        };
    }

    var turnClick = (index) => {
        turn(index, huPlayer);
        if (!checkWin(board, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }

    var turn = (pos, player) => {
        board[pos] = player;
        cells[pos].querySelector(player == "O" ? '.circle' : '.cross').classList.add("active")
        cells[pos].style.pointerEvents = 'none';
        let gameWon = checkWin(board, player);
        if (gameWon) gameOver(gameWon);
    }

    var checkWin = (board, player) => {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {
                    index: index,
                    player: player
                };
                break;
            }
        }
        return gameWon;
    }
    var triggerConfetti = () => {
        confetti({
            particleCount: 150,
            origin: {
                y: 0.8
            }
        });
    }
    var clearGrid = () => {
        board = Array.from(Array(9).keys());
        cells.forEach(function (f) {
            f.style.pointerEvents = 'auto';
            f.querySelector('.cross').classList.remove("active");
            f.querySelector('.circle').classList.remove("active");
        });
        strikeline.classList.remove("active");
    }
    var gameOver = (gameWon) => {
        updateScore(gameWon.player);
        strikethrough(gameWon.index);
        triggerConfetti();
        declareWinner(gameWon.player == huPlayer ? 1 : 2);
    }

    var declareWinner = (w) => {
        if (w == 0) {
            setTimeout(function () {
                winnerShape.classList.remove("cross");
                winnerShape.classList.remove("circle");
                winORdrawText.innerHTML = "Draw!";
                flipCard.classList.add("active");
                clearGrid();
            }, 400);
        } else if (w == 1) {
            setTimeout(function () {
                p1Score++;
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("circle");
                winnerShape.classList.add("cross");
                flipCard.classList.add("active");
                clearGrid();
            }, 700);
        } else if (w == 2) {
            setTimeout(function () {
                p2Score++;
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("cross");
                winnerShape.classList.add("circle");
                flipCard.classList.add("active");
                clearGrid();
            }, 700);
        }
    }

    var emptySquares = () => {
        return board.filter(s => typeof s == 'number');
    }

    var bestSpot = () => {
        return minimax(board, aiPlayer).index;
    }

    var checkTie = () => {
        if (emptySquares().length == 0) {
            declareWinner(0);
            return true;
        }
        return false;
    }

    var minimax = (newBoard, player) => {
        var availSpots = emptySquares();
        if (checkWin(newBoard, huPlayer)) {
            return {
                score: -10
            };
        } else if (checkWin(newBoard, aiPlayer)) {
            return {
                score: 10
            };
        } else if (availSpots.length === 0) {
            return {
                score: 0
            };
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
        var bestMove;
        if (player === aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

    //Start Game
    startGame();
}

function ConnectFour() {
    var c4_board = [];
    var c4_table = [];
    var turn = 1;
    const flipCard = document.querySelector('#connect4 .flip-card');
    var c4_turn = document.getElementById("c4_turn");
    var c4_elements =document.querySelectorAll("#c4_table>div");
    var c4_columns =document.querySelectorAll("#c4_columns>div");
    console.log(c4_elements)
    var winner = document.getElementById("c4_winner");
    var playerOneVictories = 0;
    var playerTwoVictories = 0;
    var paused = 0;
    // Create the JS array for the board
    function createBoard(r, c) {
        for (var i = 0; i < r; i++) {
            c4_board[i] = [];
            c4_table[i]= [];
            for (var j = 0; j < c; j++) {
                c4_board[i][j] = 0;
                c4_table[i][j] = c4_elements[j + (c*i)];
            }
        }
    }
    
    for (let i = 0; i < c4_columns.length; i++) {
        const el = c4_columns[i];
        el.addEventListener("click", () => {pickColumn(i);});
    }
    var clearGrid = () => {
        paused=0;
        c4_board = [];
        c4_table = [];
        c4_elements.forEach(function (f) {
            f.removeAttribute("class");
        });
        createBoard(6,7);
    }
    
    var playAgain = () => {
        clearGrid();
        flipCard.classList.remove("active");
    }
    var resetScore = () => {
        clearGrid();
        localStorage.setItem("p1Score", 0);
        localStorage.setItem("p2Score", 0);
        p1Score = 0;
        p2Score = 0;
        changeDivScoreValues();
    }

    createBoard(6, 7);
    document.querySelector("#connect4 .again").onclick = () => {
        playAgain()
    };
    document.querySelector("#connect4 .clear").onclick = () => {
        clearGrid()
    };
    document.querySelector("#connect4 .reset").onclick = () => {
        resetScore()
    };
    function colorBoard(r,c,t){
        if(t==2){
            c4_table[r][c].classList.add("p2-disc");
        }
        if(t==1){
            c4_table[r][c].classList.add("p1-disc");
        }
    }
    function chkLine(a,b,c,d) {
        // Check first cell non-zero and all cells match
        return ((a != 0) && (a ==b) && (a == c) && (a == d));
    }
    function checkIfWon(p, r,c){
        if(r<3)//vertical down
            if(chkLine(c4_board[r][c], c4_board[r+1][c], c4_board[r+2][c], c4_board[r+3][c]))
                displayWinner(p);
        else if(r>2)//vertical up
            if(chkLine(c4_board[r][c], c4_board[r-1][c], c4_board[r-2][c], c4_board[r-3][c]))
                displayWinner(p);
        if(c<4)//horizontal right
            if(chkLine(c4_board[r][c], c4_board[r][c+1], c4_board[r][c+2], c4_board[r][c+3]))
                displayWinner(p);
        else if(c>3)//horizontal left
            if(chkLine(c4_board[r][c], c4_board[r][c-1], c4_board[r][c-2], c4_board[r][c-3]))
                displayWinner(p);

        if(r<3 && c<4)//diagonal bottom right
            if(chkLine(c4_board[r][c], c4_board[r+1][c+1], c4_board[r+2][c+2], c4_board[r+3][c+3]))
                displayWinner(p);
        if(r>2 && c<4)
            if(chkLine(c4_board[r][c], c4_board[r-1][c+1], c4_board[r-2][c+2], c4_board[r-3][c+3]) )
                displayWinner(p);
        if(r>3 && c>2)//diagonal top left
            if(chkLine(c4_board[r][c], c4_board[r-1][c-1], c4_board[r-2][c-2], c4_board[r-3][c-3]))
                displayWinner(p);
        if(r>2 && c<4)
            if(chkLine(c4_board[r][c], c4_board[r-1][c+1], c4_board[r-2][c+2], c4_board[r-3][c+3]) )
                displayWinner(p);
    }
    function pickColumn(column) {
        if (paused != 1) {
            var aCol = c4_board.map(function(value,index) { return value[column]; });
            if (aCol.indexOf(0) == -1) {console.log("Column is full");
            } else {
                for (let i = 5; i> -1; i--) {
                     if (c4_board[i][column] != 1 && c4_board[i][column] != 2) {
                        c4_board[i][column] = turn;
                        colorBoard( i,column ,turn);
                        updatePlayer();
                        checkIfWon(turn,i,column);
                        break;
                    }
                }
                
            }
        }
    }
   
   
    // Swap turns
    function updatePlayer() {
        if (turn == 1) {
            c4_turn.innerHTML = "Player 2 Turn";
            c4_turn.style.background="var(--yellow)";
            turn = 2;
        } else if (turn == 2) {
            c4_turn.innerHTML = "Player 1 Turn";
            c4_turn.style.background="var(--red)";
            turn = 1;
        }
    }
    // Clear the board and unpause the game
    function reset() {
        paused = 0;
        c4_board = [];
        createBoard(7, 6);
        maintainBoard();
        winner.innerHTML = "";
    }
    // Tell the winner they're awesome and pause the game
    function displayWinner(player) {
        flipCard.classList.add("active");
        if (player == 1) {
            playerOneVictories += 1;
            document.getElementById(
                "playerOneVictories"
            ).innerHTML = playerOneVictories;
            winner.innerHTML = "Player One Wins! Press Reset to play again.";
        } else {
            playerTwoVictories += 1;
            document.getElementById(
                "playerTwoVictories"
            ).innerHTML = playerTwoVictories;
            winner.innerHTML = "Player Two Wins! Press Reset to play again.";
        }
        paused = 1;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new themeManager();
    new navbar();
    new gotop();
    new aos();
    new modal("#mdl0");
    new pagesRoute();
    new Tris();
    new ConnectFour();

    // Play logo animation once
    var logo = document.querySelector('#letsplay_logo');
    logo.classList.add('active');
});