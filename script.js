const small_screen = document.querySelector("#small");
const large_screen = document.querySelector("#large");
const input_buttons = document.querySelectorAll(".input");
const symbol_buttons = document.querySelectorAll(".symbols");

let symbol_being_pressed = false;
let symbol_count = 0;
let a = "",
  b = "";

input_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    symbol_being_pressed = false;
    if (symbol_count == 0) {
      if (small_screen.textContent == "=") {
        small_screen.textContent = "Ans = " + large_screen.textContent;
        a = "";
      }
      a += button.textContent;
      large_screen.textContent = a;
    } else {
      b += button.textContent;
      large_screen.textContent = b;
    }
  });
});

symbol_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!symbol_being_pressed) symbol_count++;
    symbol_being_pressed = true;
    if (symbol_count > 1) {
      evaluate();
    }
    small_screen.textContent = button.textContent;
  });
});

function evaluate() {
  switch (small_screen.textContent) {
    case "+":
      large_screen.textContent = `${Number(a) + Number(b)}`;
      break;
    case "-":
      large_screen.textContent = `${Number(a) - Number(b)}`;
      break;
    case "*":
      large_screen.textContent = `${Number(a) * Number(b)}`;
      break;
    case "/":
      large_screen.textContent = `${Number(a) / Number(b)}`;
      break;
    default:
      large_screen.textContent = "Syntax Error";
  }
  a = large_screen.textContent;
  symbol_count = 1;
  b = "";
}

const equal_button = document.querySelector("#equal");
equal_button.addEventListener("click", () => {
  if (symbol_count > 0 && b != "") {
    evaluate();
    small_screen.textContent = "=";
    symbol_count = 0;
  }
});
