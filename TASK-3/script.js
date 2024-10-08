const previousInputElement = document.getElementById("previous-input");
const currentInputElement = document.getElementById("current-input");

let currentInput = "";
let operator = "";
let previousInput = "";

const buttons = document.querySelectorAll("button");

function updateDisplay() {
  previousInputElement.textContent = `${previousInput} ${operator}`;
  currentInputElement.textContent = currentInput;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (!isNaN(buttonText) || buttonText === ".") {
      if (buttonText === "." && currentInput.includes(".")) return;
      currentInput += buttonText;
      updateDisplay();
    } else if (buttonText === "AC") {
      currentInput = "";
      previousInput = "";
      operator = "";
      updateDisplay();
    } else if (buttonText === "C") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (buttonText === "=") {
      if (previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);

        currentInput = result.toString();
        previousInput = "";
        operator = "";
        updateDisplay();
      }
    } else {
      if (currentInput !== "") {
        previousInput = currentInput;
        currentInput = "";
        operator = buttonText;
        updateDisplay();
      }
    }
  });
});

// Function to handle arithmetic calculations
function calculate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "^":
      return Math.pow(num1, num2);
    default:
      return 0;
  }
}
