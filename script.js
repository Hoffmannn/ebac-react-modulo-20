const input = document.querySelector("#calc-input");
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS = ["+", "-", "*", "/"];

const state = {
  currentNumber: null,
  oldNumber: null,
  currentOperator: null,
  inputValue: "",
};

function updateInput() {
  console.log(input, state.inputValue);
  if (input) {
    console.log(input.value, state.inputValue);
    input.value = state.inputValue;
  }
}

input?.addEventListener("keydown", (event) => {
  event.preventDefault();
  const { key } = event;

  // Converts , into .
  if (
    key == "," &&
    state.inputValue.length > 0 &&
    !state.inputValue.includes(".")
  ) {
    state.inputValue += ".";
    updateInput();
    return;
  }
  if (DIGITS.includes(key)) {
    state.inputValue += key;
    state.currentNumber = state.inputValue;
    updateInput();
    return;
  }
  if (OPERATORS.includes(key)) {
    state.currentOperator = key;
    state.oldNumber = state.inputValue;
    state.inputValue = "";
    updateInput();
    return;
  }
  if (key == "Backspace") {
    state.inputValue = state.inputValue.slice(0, -1);
    updateInput();
  }
  if (key == "Escape" || key == "c") {
    clearCalc();
    updateInput();
  }
  if (key == "Enter") calculate();
});

function calculate() {
  if (state.currentOperator == "+")
    state.inputValue = Number(state.oldNumber) + Number(state.currentNumber);
  if (state.currentOperator == "-")
    state.inputValue = Number(state.oldNumber) - Number(state.currentNumber);
  if (state.currentOperator == "*")
    state.inputValue = Number(state.oldNumber) * Number(state.currentNumber);
  if (state.currentOperator == "/") {
    if (state.inputValue == 0) {
      state.inputValue = "";
    } else {
      state.inputValue = Number(state.oldNumber) / Number(state.currentNumber);
    }
  }

  state.oldNumber = state.inputValue;
  updateInput();
}

function addDigit(value) {
  if (DIGITS.includes(value)) {
    state.inputValue += value;
    state.currentNumber = state.inputValue;
    updateInput();
    return;
  }
  if (
    value == "," &&
    state.inputValue.length > 0 &&
    !state.inputValue.includes(".")
  ) {
    state.inputValue += ".";
    state.currentNumber = state.inputValue;
    return;
  }
  if (OPERATORS.includes(value)) {
    state.oldNumber = state.inputValue;
    state.currentOperator = value;
    state.inputValue = "";
    return;
  }
  updateInput();
}

function clearCalc() {
  state.inputValue = "";
  state.currentNumber = "";
  state.oldNumber = "";
  updateInput();
  return;
}

module.exports = {
  addDigit,
  calculate,
  clearCalc,
  state, // Exporting the state for testing purposes
};
