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
    t.activeTheme= "light";
    t.setTheme =(theme)=>{
      t.activeTheme = theme;
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme);
    }
    t.dark = ()=>{
      t.setTheme("dark");
    }
    t.light = ()=>{
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
    const t= this;
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




function Tris(){
    var currentPlayer = 0;
    var p1Score = localStorage.getItem("p1Score");
    var p2Score = localStorage.getItem("p2Score");
    var counter = 0;
    var win = 0;
    var plays = [];
    const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    const cells = document.querySelectorAll(".tris-grid>div");
    
    var strikeline = document.querySelector(".strike");
    var root = document.querySelector(':root');
    var flipCard = document.querySelector('.flip-card');
    var player1 = document.querySelector(".player1");
    var player2 = document.querySelector(".player2");
    var winnerShape = document.querySelector('.winner .shape');
    var winORdrawText = document.querySelector(".winner p");
    var strikethrough=(index) =>{
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
    var triggerConfetti=()=>{
        confetti({
                particleCount: 150,
                origin: {
                    y: 0.8
                }
            });
    }
    var playAgain = ()=>{
        clearGrid();
        flipCard.classList.remove("active");
    }
    var changeDivScoreValues = ()=>{
        player1.innerHTML = p1Score;
        player2.innerHTML = p2Score;
    }
    var resetScore= ()=>{
        clearGrid();
        localStorage.setItem("p1Score", 0);
        localStorage.setItem("p2Score", 0);
        p1Score = 0;
        p2Score = 0;
        changeDivScoreValues();
    }
    var togglePlayerTurn=()=> {
        currentPlayer = !currentPlayer;
    }
    var blockAllbtns=()=> {
        cells.forEach(function (e) {
            e.style.pointerEvents = 'none';
        })
    }
    
    var updateScore=()=>{
        winORdrawText.innerHTML = "Winner!";
        !currentPlayer ? player1.innerHTML = p1Score : player2.innerHTML = p2Score;
        localStorage.setItem("p1Score", p1Score);
        localStorage.setItem("p2Score", p2Score);
        blockAllbtns();
    }
    
    var checkWin=(b,index)=> {
        if (currentPlayer) {
            b.querySelector('.circle').classList.add("active");
            plays[index] ='O';
        } else {
            b.querySelector('.cross').classList.add("active");
            plays[index] ='X';
        }
        b.style.pointerEvents = 'none';
        winningCombos.some(function (e) {
            if (plays[e[0]] === 'X' && plays[e[1]] === 'X' && plays[e[2]] === 'X') {
                strikethrough(winningCombos.indexOf(e));
                p1Score++;
                win = 1;
                updateScore();
                triggerConfetti();
                setTimeout(function () {
                    blockAllbtns()
                    strikeline.classList.remove("active");
                    winnerShape.classList.remove("circle");
                    winnerShape.classList.add("cross");
                    flipCard.classList.add("active");
                    clearGrid();
                }, 700);
            } else if (plays[e[0]] === 'O' && plays[e[1]] === 'O' && plays[e[2]] === 'O') {
                //            console.log("win " + winningCombos.indexOf(e));
                strikethrough(winningCombos.indexOf(e));
                p2Score++;
                win = 1;
                updateScore();
                triggerConfetti();
                setTimeout(function () {
                    blockAllbtns()
                    strikeline.classList.remove("active");
                    winnerShape.classList.remove("cross");
                    winnerShape.classList.add("circle");
                    flipCard.classList.add("active");
                    clearGrid();
                }, 700);
            }
        });
        counter++;
        if (counter == 9 && win == 0) {
            setTimeout(function () {
                winnerShape.classList.remove("cross");
                winnerShape.classList.remove("circle");
                winORdrawText.innerHTML = "Draw!";
                flipCard.classList.add("active");
                clearGrid();
            }, 300);
        }
        togglePlayerTurn();
    }
    var clearGrid=()=>{
        currentPlayer = 0;
        counter = 0;
        win = 0
        plays = [];
        cells.forEach(function (f) {
            f.style.pointerEvents = 'auto';
            f.querySelector('.cross').classList.remove("active");
            f.querySelector('.circle').classList.remove("active");
        })
    }
    var setScale= ()=>{
        var playarea = document.querySelector("#tris");
        if (window.innerWidth < 430) {
            playarea.style.transform = `scale(${window.innerWidth/430})`;
        } else {
            playarea.style.transform = "scale(1)";
        }
        console.log(playarea.style.transform);
    }
    
    //Setup
    if (p1Score == null && p2Score == null) {
        p1Score = 0;
        p2Score = 0;
    }
    changeDivScoreValues();
    setScale();
    cells.forEach(function(el,index){
        el.addEventListener("click",()=>{
            checkWin(el,index);
        })
    });
    document.querySelector("#tris .again").onclick= ()=>{playAgain()};
    document.querySelector("#tris .clear").onclick= ()=>{clearGrid()};
    document.querySelector("#tris .reset").onclick= ()=>{resetScore()};
}

document.addEventListener("DOMContentLoaded", () => {
    new themeManager();
    new navbar();
    new gotop();
    new aos();
    new modal("#mdl1");
    new modal("#mdl2");
    new pagesRoute();
    new Tris();
});