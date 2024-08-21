const left = document.querySelector("#left");
const right = document.querySelector("#right");
const symbol = document.querySelector("#symbol");
const input_buttons = document.querySelectorAll(".input");
const symbol_buttons = document.querySelectorAll(".symbols");

let symbol_being_pressed = false;
let symbol_count = 0;
let a = "",
  b = "";
let prev_ans = 0;

input_buttons.forEach((button) => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

symbol_buttons.forEach((button) => {
  button.addEventListener("click", () => handleSymbol(button.textContent));
});

function handleInput(value) {
  symbol_being_pressed = false;
  if (symbol_count == 0) {
    if (value === "." && a.includes(".")) return;
    right.textContent = "";
    if (left.textContent == "Ans = ") {
      left.textContent = right.textContent;
      a = "";
    }
    a += value;
    right.textContent = a;
  } else {
    if (value === "." && b.includes(".")) return;
    b += value;
    right.textContent = b;
  }
}

function handleSymbol(symbol) {
  if (!symbol_being_pressed) symbol_count++;
  symbol_being_pressed = true;
  right.textContent = "";
  if (symbol_count > 1) {
    evaluate();
  }
  left.textContent = a + " " + symbol;
  right.textContent = "";
}

function evaluate() {
  const m = a === "Ans" ? prev_ans : Number(a);
  const n = b === "Ans" ? prev_ans : Number(b);
  switch (left.textContent.charAt(left.textContent.length - 1)) {
    case "+":
      right.textContent = `${m + n}`;
      break;
    case "-":
      right.textContent = `${m - n}`;
      break;
    case "*":
      right.textContent = `${m * n}`;
      break;
    case "/":
      right.textContent = `${m / n}`;
      break;
    default:
      right.textContent = "Syntax Error";
  }
  if (right.textContent.includes(".")) {
    if (right.textContent.split(".")[1].length > 9) {
      right.textContent = parseFloat(Number(right.textContent).toFixed(9));
    }
  }
  a = right.textContent;
  prev_ans = Number(a);
  b = "";
  symbol_count = 1;
}

const equal_button = document.querySelector("#equal");
equal_button.addEventListener("click", () => {
  if (symbol_count == 0 && a === "") return;
  if (symbol_count > 0 && b === "") return;

  if (symbol_count > 0) {
    evaluate();
    right.textContent = a;
    left.textContent = "Ans = ";
    symbol_count = 0;
  } else {
    left.textContent = "Ans = ";
    if (a != "Ans") prev_ans = Number(right.textContent);
    right.textContent = prev_ans;
  }
  if (right.textContent === "NaN" || right.textContent === "Infinity")
    right.textContent = "Error";
});

const ans_button = document.querySelector("#ans");
ans_button.addEventListener("click", () => {
  if (symbol_count == 0) {
    left.textContent = "";
    a = "Ans";
  } else b = "Ans";
  right.textContent = "Ans";
});

const clear_button = document.querySelector("#clear");
clear_button.addEventListener("click", () => {
  left.textContent = "";
  right.textContent = "";
  a = "";
  b = "";
});

const del_button = document.querySelector("#del");
del_button.addEventListener("click", () => {
  if (left.textContent == "Ans = ") {
    clear_button.click();
    return;
  }
  if (symbol_being_pressed) {
    symbol_being_pressed = false;
    symbol_count--;
    right.textContent = left.textContent.slice(0, -1);
    left.textContent = "";
  }
  right.textContent =
    right.textContent === "Ans" ? "" : right.textContent.slice(0, -1);
  if (symbol_count == 0) a = right.textContent;
  else {
    b = right.textContent;
    if (b === "") symbol_being_pressed = true;
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if ("1234567890.".includes(key)) handleInput(key);
  else if ("+-/*".includes(key)) handleSymbol(key);
  else if (key === "=" || key === "Enter") equal_button.click();
  else if (key === "Backspace") del_button.click();
  else if (key === "c" || key === "C") clear_button.click();
  else if (key === "a" || key === "A") ans_button.click();
  else if (key === ".") decimal_button.click();
});
