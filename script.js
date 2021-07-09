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
            console.log("toggleNav");
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
        t.bdy = document.body.classList;
        t.targets = document.querySelectorAll('[data-toggle="' + t.m.id + '"]');
        t.closebtns = t.m.querySelectorAll('.close-modal');
    }
    t.show = function () {
        t.bdy.add('_overflowhidden');
        t.m.classList.add('_show-modal');
    }
    t.hide = function () {
        t.m.classList.remove('_show-modal');
        t.bdy.remove('_overflowhidden');
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

function Tris() {
    var origBoard;
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
    const flipCard = document.querySelector('.flip-card');
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");
    const winnerShape = document.querySelector('.winner .shape');
    const winORdrawText = document.querySelector(".winner p");
    const cells = document.querySelectorAll(".tris-grid>div");

    var playAgain = () => {
        clearGrid();
        flipCard.classList.remove("active");
    }
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
    var setScale = () => {
        var playarea = document.querySelector("#tris");
        if (window.innerWidth < 430) {
            playarea.style.transform = `scale(${window.innerWidth/430})`;
        } else {
            playarea.style.transform = "scale(1)";
        }
        console.log(playarea.style.transform);
    }
    var startGame = () => {
        origBoard = Array.from(Array(9).keys());
        if (p1Score == null && p2Score == null) {
            p1Score = 0;
            p2Score = 0;
        }
        changeDivScoreValues();
        setScale();
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
        if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }

    var turn = (pos, player) => {
        origBoard[pos] = player;
        cells[pos].querySelector(player == "O" ? '.circle' : '.cross').classList.add("active")
        cells[pos].style.pointerEvents = 'none';
        let gameWon = checkWin(origBoard, player);
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
        origBoard = Array.from(Array(9).keys());
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
        return origBoard.filter(s => typeof s == 'number');
    }

    var bestSpot = () => {
        return minimax(origBoard, aiPlayer).index;
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
    let w = 7;
    let h = 6;
    let bs = 100;
    let factor = 9 / 10;
    let player = 1;
    let finished = 0;
    let result;
    let resultP;

    let board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];


    function setup() {
        if (resultP == null) {
            resultP = createP("");
            resultP.style('font-size', '32pt');
        }

        createCanvas(700, 600);
        frameRate(60);
        ellipseMode(CORNER); //draw circles from their top left point


        player = 1;
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                board[y][x] = 0;
                finished = 0;
                resultP.html('');
            }
        }
    }

    function p(y, x) {
        return (y < 0 || x < 0 || y >= h || x >= w) ? 0 : board[y][x];
    }


    function getWinner() { //loops through rows, columns, diagonals, etc for win condition

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {

                if (p(y, x) != 0 && p(y, x) == p(y, x + 1) && p(y, x) == p(y, x + 2) && p(y, x) == p(y, x + 3)) {
                    return p(y, x);
                }

                if (p(y, x) != 0 && p(y, x) == p(y + 1, x) && p(y, x) == p(y + 2, x) && p(y, x) == p(y + 3, x)) {
                    return p(y, x);
                }

                for (d = -1; d <= 1; d += 2) {
                    if (p(y, x) != 0 && p(y, x) == p(y + 1 * d, x + 1) && p(y, x) == p(y + 2 * d, x + 2) && p(y, x) == p(y + 3 * d, x + 3)) {
                        return p(y, x);
                    }
                }

            }
        }


        for (y = 0; y < h; y++)
            for (x = 0; x < w; x++)
                if (p(y, x) == 0) return 0;
        return -1; //tie
    }

    function nextSpace(x) { //finds the next space (from the bottom)
        for (y = h - 1; y >= 0; y--) {
            if (board[y][x] == 0) {
                return y;
            }
        }
        return -1;
    }

    function mousePressed() {

        if (player == 2) {
            if (getWinner() == 0) {
                let x = floor(mouseX / bs),
                    y = nextSpace(x);
                if (y >= 0) {
                    board[y][x] = player;
                    player = 1;
                }
            }
        }
    }



    function draw() {

        if (player == 1) {
            result = bestMove();

            board[nextSpace(result)][result] = 1;
        }

        for (j = 0; j < h; j++)
            for (i = 0; i < w; i++) {
                fill(255);
                rect(i * bs, j * bs, bs, bs);
                if (board[j][i] > 0) {
                    fill(board[j][i] == 1 ? 255 : 0, board[j][i] == 2 ? 255 : 0, 0);
                    ellipse(i * bs + (1 - factor) / 2 * bs, j * bs + (1 - factor) / 2 * bs, bs * factor, bs * factor);
                }
            }

        if (getWinner() != 0 && finished == 0) {

            let result = getWinner();
            let text;

            if (result == -1) {
                text = 'You tied the AI!';
            } else {
                text = `${result == 1 ? "The AI": "You"} won. `;
            }

            text += " Press space to retry!";
            resultP.html(text);
            finished = 1;
        }
    }

    function keyPressed() {

        if (getWinner() != 0 && key == " ") {
            setup();
        }
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
});