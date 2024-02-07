const board = document.getElementById("gameBoard");
const overlay = document.querySelector(".overlay");
const observerContainer = document.querySelector(".observerContainer");
console.log(board);

let life = 5;
let score = 0;

function start() {
  makedivs();
  if (document.documentElement.clientWidth < 500) {
    intervalID = setInterval(makedivs, randbtwn(200, 300));
  } else {
    intervalID = setInterval(makedivs, randbtwn(700, 1000));
  }
}

function makedivs() {
  if (life > 0) {
    const clientWidth = document.documentElement.clientWidth - 50;
    const clientHeight = document.documentElement.clientHeight;
    const el = document.createElement("div");
    el.classList.add("div");
    el.addEventListener("mousedown", () => {
      score += 1;
      life += 1;
      document.querySelector(".score").textContent = `score: ${score}`;
      el.remove();
    });
    el.style.backgroundColor = randomColor();
    el.style.position = "absolute";
    el.style.top = `${giveRandomNum(0.25 * clientHeight)}px`; // ger randomly after determining client height
    el.style.left = `${giveRandomNum(clientWidth)}px`; // ger randomly after determining client width
    board.appendChild(el);

    //animate after everyting is done
    el.animate([{ transform: "translateY(100vh)" }], {
      duration: 7000,
      iterations: 1,
    });
    let options = {
      root: null,
      threshold: 0.9,
    };
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          console.log(entry);
          el.remove();
          life--;
          document.querySelector(".life").textContent =
            life >= 0 ? `life: ${life}` : `life: 0`;
          if (life <= 0) {
            overlay.style.display = "flex";
          }
        }
      });
    }, options);
    observer.observe(el);
  }
}

start();

function randomColor() {
  return `rgb(${Math.round(Math.random() * 255) + 1},${Math.round(Math.random() * 255) + 1
    },${Math.round(Math.random() * 255) + 1}`;
}

function giveRandomNum(num) {
  return Math.floor(Math.random() * num) + 1;
}
function randbtwn(min, max) {
  return Math.floor(Math.random() * Math.abs(min - max) + min);
}
