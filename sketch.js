let now = null;
const clockDiv = document.getElementById("clock");
const monthsTop = document.getElementById("monthsTop");
const monthsBot = document.getElementById("monthsBot");
const daysTop = document.getElementById("daysTop");
const daysBot = document.getElementById("daysBot");
const hoursTop = document.getElementById("hoursTop");
const hoursBot = document.getElementById("hoursBot");
const minutesTop = document.getElementById("minutesTop");
const minutesBot = document.getElementById("minutesBot");
const secondsTop = document.getElementById("secondsTop");
const secondsBot = document.getElementById("secondsBot");

// Euclidean algorithm
function reduce(numerator, denominator) {
  let gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
    // if b != 0, recursively call gcd(b, a%b), which replaces 'a' with 'b' and 'b' with 'a%b' in each call until 'b' reaches 0
    // if b = 0, return 'a'
  };
  gcd = gcd(numerator, denominator);
  //   return [this.num, this.den];
  return [numerator / gcd, denominator / gcd];
}

function updateTime() {
  now = new Date();

  const metrics = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  /* ---------------------------------- month --------------------------------- */

  const correctedMonth = now.getMonth() + 1;
  monthsTop.textContent = reduce(correctedMonth, 12)[0];
  monthsBot.textContent = reduce(correctedMonth, 12)[1];

  /* ----------------------------------- day ---------------------------------- */

  function findTotalDays(month) {
    const totalDays = {
      28: [2],
      30: [4, 6, 9, 11],
      31: [1, 3, 5, 7, 8, 10, 12],
    };

    for (const d in totalDays) {
      if (totalDays[d].includes(correctedMonth)) {
        return parseInt(d);
      }
    }
    return null;
  }

  const totalDays = findTotalDays(now.getMonth());

  if (totalDays === 28) {
    daysTop.textContent = reduce(now.getDate(), 28)[0];
    daysBot.textContent = reduce(now.getDate(), 28)[1];
  } else if (totalDays === 29) {
    daysTop.textContent = reduce(now.getDate(), 29)[0];
    daysBot.textContent = reduce(now.getDate(), 29)[1];
  } else if (totalDays === 30) {
    daysTop.textContent = reduce(now.getDate(), 30)[0];
    daysBot.textContent = reduce(now.getDate(), 30)[1];
  } else if (totalDays === 31) {
    daysTop.textContent = reduce(now.getDate(), 31)[0];
    daysBot.textContent = reduce(now.getDate(), 31)[1];
  } else {
    return;
  }

  /* ---------------------------------- hour ---------------------------------- */

  hoursTop.textContent = reduce(now.getHours(), 24)[0];
  hoursBot.textContent = reduce(now.getHours(), 24)[1];

  /* --------------------------------- minute --------------------------------- */

  minutesTop.textContent = reduce(now.getMinutes(), 60)[0];
  minutesBot.textContent = reduce(now.getMinutes(), 60)[1];

  /* --------------------------------- second --------------------------------- */

  secondsTop.textContent = reduce(now.getSeconds(), 60)[0];
  secondsBot.textContent = reduce(now.getSeconds(), 60)[1];

  //   const formatNow = now.toLocaleString("en-US", metrics);
  //   clockDiv.textContent = formatNow;
}

const keepTime = setInterval(updateTime, 1000);

const checkbox = document.getElementById("checkbox");
const clues = document.getElementsByClassName("clue");

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    for (let i = 0; i < clues.length; i++) {
      clues[i].style.visibility = "visible";
    }
    console.log("toggled");
  } else {
    for (let i = 0; i < clues.length; i++) {
      clues[i].style.visibility = "hidden";
    }
    console.log("untoggled");
  }
});
