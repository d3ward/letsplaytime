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
        clearInterval(interval);
        interval = setInterval(() => {
            clear("#" + activePage.id, id)
        }, 50);
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

let text = {
    '#home': "Let's Play ! ",
    '#tris': "Tic Tac Toe",
    '#connect4': "Connect Four",
    '#memory': "Memory Tiles"
};

let i = 0;
let j = -1;
let reverse = true;
window.location.hash
let interval;
if (!window.location.hash)
    interval = setInterval(() => {
        type("#home")
    }, 100);

function type(u) {
    let nowText = text[u];
    document.getElementById("typewriter").innerText = nowText.substr(0, j);
    if (j > nowText.length) {
        clearInterval(interval);
    }
    j += 1;
}

function clear(u, z) {
    let nowText = text[u];
    document.getElementById("typewriter").innerText = nowText.substr(0, j);
    if (j < 0) {
        clearInterval(interval);
        interval = setInterval(() => (type(z)), 150);
    }
    j -= 1;
}


var setScale = (el) => {
    if (window.innerWidth < 430) {
        el.style.transform = `scale({window.innerWidth/430})`;
    } else {
        el.style.transform = "scale(1)";
    }
}
var triggerConfetti = () => {
    confetti({
        particleCount: 150,
        origin: {
            y: 0.8
        }
    });
}
// Swap turns
var updateTurnLabel = (el, txt, color) => {
    el.innerText = txt;
    el.style.background = color;
}
const updateScoreLabels = (p1, p2, s1, s2) => {
    p1.innerText = s1;
    p2.innerText = s2;
}

function Tris() {
    var board;
    var p1_score = localStorage.getItem("tris_p1");
    var p2_score = localStorage.getItem("tris_p2");
    if (p1_score == undefined) {
        p1_score = 0;
        p2_score = 0;
    }
    const p1_label_score = document.querySelector("#tris .player1_score");
    const p2_label_score = document.querySelector("#tris .player2_score");
    updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);

    var paused = false;
    const vsAI = true;
    const p1_sign = 'X';
    const p2_sign = 'O';
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
    const tris_turn = document.getElementById("tris_turn");
    const strikeline = document.querySelector(".strike");
    const root = document.querySelector(':root');
    const flipCard = document.querySelector('#tris .flip-card');

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
        localStorage.setItem("tris_p1", 0);
        localStorage.setItem("tris_p2", 0);
        p1_score = 0;
        p2_score = 0;
        updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
    }

    var blockAllbtns = () => {
        cells.forEach(function (e) {
            e.style.pointerEvents = 'none';
        })
    }



    var startGame = () => {
        board = Array.from(Array(9).keys());

        setScale(tris_grid);
        cells.forEach(function (el, index) {
            el.addEventListener("click", () => {
                if (!paused)
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
        turn(index, p1_sign);
        updateTurnLabel(tris_turn, "AI turn", "var(--red)");
        paused = true;
        setTimeout(() => {
            if (!checkWin(board, p1_sign) && !checkTie()) {
                turn(bestSpot(), p2_sign);

                setTimeout(() => {
                    updateTurnLabel(tris_turn, "Player 1 turn", "var(--blue)");
                    paused = false;
                }, 1000);

            }
        }, 400);

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

    var clearGrid = () => {
        board = Array.from(Array(9).keys());
        cells.forEach(function (f) {
            f.style.pointerEvents = 'auto';
            f.querySelector('.cross').classList.remove("active");
            f.querySelector('.circle').classList.remove("active");
        });
        strikeline.classList.remove("active");
        updateTurnLabel(tris_turn, "Player 1 turn", "var(--blue)");
    }
    var gameOver = (gameWon) => {
        strikethrough(gameWon.index);
        triggerConfetti();
        declareWinner(gameWon.player == p1_sign ? 1 : 2);
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
                p1_score++;
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("circle");
                winnerShape.classList.add("cross");
                flipCard.classList.add("active");
                clearGrid();
                updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
            }, 700);
        } else if (w == 2) {
            setTimeout(function () {
                p2_score++;
                blockAllbtns()
                strikeline.classList.remove("active");
                winnerShape.classList.remove("cross");
                winnerShape.classList.add("circle");
                flipCard.classList.add("active");
                clearGrid();
                updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
            }, 700);
        }

    }

    var emptySquares = () => {
        return board.filter(s => typeof s == 'number');
    }

    var bestSpot = () => {
        return minimax(board, p2_sign).index;
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
        if (checkWin(newBoard, p1_sign)) {
            return {
                score: -10
            };
        } else if (checkWin(newBoard, p2_sign)) {
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
            if (player == p2_sign) {
                var result = minimax(newBoard, p1_sign);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, p2_sign);
                move.score = result.score;
            }
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
        var bestMove;
        if (player === p2_sign) {
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
    var p1_score = localStorage.getItem("c4_p1");
    var p2_score = localStorage.getItem("c4_p2");
    if (p1_score == undefined) {
        p1_score = 0;
        p2_score = 0;
    }
    const p1_label_score = document.querySelector("#connect4 .player1_score");
    const p2_label_score = document.querySelector("#connect4 .player2_score");
    updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
    const flipCard = document.querySelector('#connect4 .flip-card');
    var c4_turn = document.getElementById("c4_turn");
    var c4_elements = document.querySelectorAll("#c4_table>div");
    var c4_columns = document.querySelectorAll("#c4_columns>div");
    var winner = document.getElementById("c4_winner");

    var paused = 0;
    // Create the JS array for the board
    function createBoard(r, c) {
        for (var i = 0; i < r; i++) {
            c4_board[i] = [];
            c4_table[i] = [];
            for (var j = 0; j < c; j++) {
                c4_board[i][j] = 0;
                c4_table[i][j] = c4_elements[j + (c * i)];
            }
        }
    }

    for (let i = 0; i < c4_columns.length; i++) {
        const el = c4_columns[i];
        el.addEventListener("click", () => {
            pickColumn(i);
        });
    }
    var clearGrid = () => {
        paused = 0;
        c4_board = [];
        c4_table = [];
        c4_elements.forEach(function (f) {
            f.removeAttribute("class");
        });
        createBoard(6, 7);
        updateTurnLabel(c4_turn, "Player " + turn + " turn", (turn == 1) ? "var(--red)" : "var(--yellow)");
    }

    var playAgain = () => {
        clearGrid();
        flipCard.classList.remove("active");
    }
    var resetScore = () => {
        clearGrid();
        localStorage.setItem("c4_p1", 0);
        localStorage.setItem("c4_p2", 0);
        p1_score = 0;
        p2_score = 0;
        updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
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

    function colorBoard(r, c, t) {
        if (t == 2) {
            c4_table[r][c].classList.add("p2-disc");
        }
        if (t == 1) {
            c4_table[r][c].classList.add("p1-disc");
        }
    }
    // Check first cell non-zero and all cells match
    function chkLine(a, b, c, d) {
        return ((a != 0) && (a == b) && (a == c) && (a == d));
    }

    function checkIfWon(p, r, c) {
        if (r < 3) //vertical down
            if (chkLine(c4_board[r][c], c4_board[r + 1][c], c4_board[r + 2][c], c4_board[r + 3][c]))
                displayWinner(p);
        if (r > 2) //vertical up
            if (chkLine(c4_board[r][c], c4_board[r - 1][c], c4_board[r - 2][c], c4_board[r - 3][c]))
                displayWinner(p);
        if (c < 4) //horizontal right
            if (chkLine(c4_board[r][c], c4_board[r][c + 1], c4_board[r][c + 2], c4_board[r][c + 3]))
                displayWinner(p);
        if (c > 3) //horizontal left
            if (chkLine(c4_board[r][c], c4_board[r][c - 1], c4_board[r][c - 2], c4_board[r][c - 3]))
                displayWinner(p);
        if ((r + 3 < 6 && c + 3 < 7))
            if (chkLine(c4_board[r][c], c4_board[r + 1][c + 1], c4_board[r + 2][c + 2], c4_board[r + 3][c + 3]))
                displayWinner(p);
        if (r - 3 > -1 && c - 3 > -1)
            if (chkLine(c4_board[r][c], c4_board[r - 1][c - 1], c4_board[r - 2][c - 2], c4_board[r - 3][c - 3]))
                displayWinner(p);
        if (r - 3 > -1 && c + 3 < 7)
            if (chkLine(c4_board[r][c], c4_board[r - 1][c + 1], c4_board[r - 2][c + 2], c4_board[r - 3][c + 3]))
                displayWinner(p);
        if (r + 3 < 6 && c - 3 > -1)
            if (chkLine(c4_board[r][c], c4_board[r + 1][c - 1], c4_board[r + 2][c - 2], c4_board[r + 3][c - 3]))
                displayWinner(p);
    }

    function pickColumn(column) {
        if (paused != 1) {
            var aCol = c4_board.map(function (value, index) {
                return value[column];
            });
            if (aCol.indexOf(0) == -1) {
                console.log("Column is full");
            } else {
                for (let i = 5; i > -1; i--) {
                    if (c4_board[i][column] != 1 && c4_board[i][column] != 2) {
                        c4_board[i][column] = turn;
                        colorBoard(i, column, turn);
                        checkIfWon(turn, i, column);
                        if (turn == 1) turn = 2;
                        else turn = 1;
                        updateTurnLabel(c4_turn, "Player " + turn + " turn", (turn == 1) ? "var(--red)" : "var(--yellow)");
                        break;
                    }
                }
            }
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
            p1_score++;
            winner.innerHTML = "Player One Wins! Press Reset to play again.";
        } else {
            p2_score++;
            winner.innerHTML = "Player Two Wins! Press Reset to play again.";
        }
        localStorage.setItem("c4_p1", p1_score);
        localStorage.setItem("c4_p2", p2_score);
        updateScoreLabels(p1_label_score, p2_label_score, p1_score, p2_score);
        paused = 1;
        triggerConfetti();
    }
}

function memory() {
    var symbols = [
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>',
        '<svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>'
    ],
        opened = [],
        match = 0,
        moves = 0,
        deck = document.querySelector('#memory .memory_table'),
        boxes = document.querySelectorAll('#memory .memory_table>div'),
        scorePanel = document.querySelector('#score-panel'),
        moveNum = document.querySelector('#memory .moves'),
        ratingStars = document.querySelector('#memory .stars>*'),
        restart = document.querySelector('#memory .restart'),
        delay = 800,
        gameCardsQTY = symbols.length / 2,
        rank3stars = gameCardsQTY + 2,
        rank2stars = gameCardsQTY + 6,
        rank1stars = gameCardsQTY + 10;

    // Shuffle function 
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

 

    // Set Rating and final Score
    function setRating(moves) {
        var rating = 3;
        if (moves > rank3stars && moves < rank2stars) {
            ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
            rating = 2;
        } else if (moves > rank2stars && moves < rank1stars) {
            ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
            rating = 1;
        } else if (moves > rank1stars) {
            ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
            rating = 0;
        }
        return {
            score: rating
        };
    };

    // End Game
    function endGame(moves, score) {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Congratulations! You Won!',
            text: 'With ' + moves + ' Moves and ' + score + ' Stars.\nBoom Shaka Lak!',
            type: 'success',
            confirmButtonColor: '#9BCB3C',
            confirmButtonText: 'Play again!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                initGame();
            }
        })
    }

    // Restart Game
    restart.addEventListener('click', function () {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Are you sure?',
            text: "Your progress will be Lost!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9BCB3C',
            cancelButtonColor: '#EE0E51',
            confirmButtonText: 'Yes, Restart Game!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                initGame();
            }
        })
    });
    // Card flip
    function openCard(d) {
        d.classList.add("open");
        var card =d.innerHTML;
        opened.push(card);
        // Compare with opened card
        if (opened.length > 1) {
            if (card == opened[0]) {
                document.querySelectorAll(".memory_table>div.open").forEach(element => {
                    element.classList.add('match');
                    element.classList.add('show');
                        element.classList.remove('open');
                    
                });
                match++;
            } else {
                document.querySelectorAll(".memory_table>div.open").forEach(element => {
                    element.classList.add('nomatch');
                    setTimeout(() => {
                        element.classList.remove('nomatch'); 
                        element.classList.remove('open');
                    }, 1200);
                    
                });
            }
            opened = [];
            moves++;
            //setRating(moves);
            //moveNum.html(moves);
        }
        /*
        // End Game if match all cards
        if (gameCardsQTY === match) {
            setRating(moves);
            var score = setRating(moves).score;
            setTimeout(function () {
                endGame(moves, score);
            }, 500);
        }*/
    }
   // Initial Game
   function initGame() {
    var cards = shuffle(symbols.concat(symbols));
    while(deck.firstChild)
        deck.removeChild(deck.firstChild);
    match = 0;
    moves = 0;
    moveNum.innerHTML= moves;
    ratingStars.classList.remove('fa-star-o');
    ratingStars.classList.add('fa-star');
    for (var i = 0; i < cards.length; i++) {
        var d= document.createElement("div");
        
        d.innerHTML="<span></span><span>"+cards[i]+"</span>";
        
        deck.appendChild(d);
    }
    var boxes=document.querySelectorAll(".memory_table>div");
    boxes.forEach(el=> {
        el.addEventListener('click',()=>{
            openCard(el);
        })
    });
};
    initGame();
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
    new memory();

    // Play logo animation once
    var logo = document.querySelector('#letsplay_logo');
    logo.classList.add('active');
});