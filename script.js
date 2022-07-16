const input = document.querySelector("#calc-input");
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS = ["+", "-", "*", "/"];

var currentNumber = null;
var oldNumber = null;
var currentOperator = null;

input.addEventListener("keydown", (event) => {
  event.preventDefault();
  const { key } = event;

  // Converts , into .
  if (key == "," && input.value.length > 0 && !input.value.includes(".")) {
    input.value += ".";
    return;
  }
  if (DIGITS[key]) {
    input.value += key;
    currentNumber = input.value;
    return;
  }
  if (OPERATORS.includes(key)) {
    currentOperator = key;
    oldNumber = input.value;
    input.value = "";
    return;
  }
  if (key == "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (key == "Escape" || key == "c") {
    input.value = "";
    oldNumber = null;
    currentNumber = null;
  }
  if (key == "Enter") calculate();
});

function calculate() {
  if (currentOperator == "+")
    input.value = Number(oldNumber) + Number(currentNumber);
  if (currentOperator == "-")
    input.value = Number(oldNumber) - Number(currentNumber);
  if (currentOperator == "*")
    input.value = Number(oldNumber) * Number(currentNumber);
  if (currentOperator == "/") {
    if (input.value == 0) {
      input.value = "";
    } else {
      input.value = Number(oldNumber) / Number(currentNumber);
    }
  }

  console.log(oldNumber, currentNumber, input.value);
  oldNumber = input.value;
}

function addDigit(value) {
  console.log(DIGITS[value], value);
  if (DIGITS[value]) {
    input.value += value;
    currentNumber = input.value;
    return;
  }
  if (value == "," && input.value.length > 0 && !input.value.includes(".")) {
    input.value += ".";
    currentNumber = input.value;
    return;
  }
  if (OPERATORS.includes(value)) {
    oldNumber = input.value;
    currentOperator = value;
    input.value = "";
    return;
  }
}
