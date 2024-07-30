const buttons = document.querySelectorAll("button");
const screen = document.querySelector("#screen");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    screen.textContent += button.textContent;
  });
});

let sum = (a, b) => a + b;
let prod = (a, b) => a * b;
let diff = (a, b) => a - b;
let quot = (a, b) => a / b;
