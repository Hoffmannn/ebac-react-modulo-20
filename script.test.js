const { addDigit, calculate, clearCalc, state } = require("./script");

describe("Calculator Functions", () => {
  beforeEach(() => {
    clearCalc();
  });

  test("addDigit should add digits to the input", () => {
    addDigit("1");
    expect(state.inputValue).toBe("1");

    addDigit("2");
    expect(state.inputValue).toBe("12");
  });

  test("addDigit should add a decimal point if not already present", () => {
    addDigit("1");
    addDigit(",");
    expect(state.inputValue).toBe("1.");

    // Não deve adicionar outro ponto decimal
    addDigit(",");
    expect(state.inputValue).toBe("1.");
  });

  test("addDigit should handle operators", () => {
    addDigit("5");
    addDigit("+");
    expect(state.inputValue).toBe("");
    expect(state.oldNumber).toBe("5");
    expect(state.currentOperator).toBe("+");
  });

  test("calculate should perform addition", () => {
    addDigit("5");
    addDigit("+");
    addDigit("3");
    calculate();
    expect(state.inputValue).toBe(8);
  });

  test("calculate should perform subtraction", () => {
    addDigit("5");
    addDigit("-");
    addDigit("3");
    calculate();
    expect(state.inputValue).toBe(2);
  });

  test("calculate should perform multiplication", () => {
    addDigit("5");
    addDigit("*");
    addDigit("3");
    calculate();
    expect(state.inputValue).toBe(15);
  });

  test("calculate should perform division", () => {
    addDigit("6");
    addDigit("/");
    addDigit("3");
    calculate();
    expect(state.inputValue).toBe(2);
  });

  test("clearCalc should clear the input and reset values", () => {
    addDigit("5");
    addDigit("+");
    clearCalc();
    expect(state.inputValue).toBe("");
    expect(state.currentNumber).toBe("");
    expect(state.oldNumber).toBe("");
  });
});
