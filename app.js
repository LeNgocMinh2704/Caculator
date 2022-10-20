class Caculator {
  constructor(previous, current) {
    this.previousoutput = previous;
    this.currentoutput = current;
    this.clear();
  }
  clear() {
    this.previousoutput = "";
    this.currentoutput = "";
    this.operation = undefined;
  }
  delete() {}
  appendNumber(number) {
    if (number === "." && this.currentoutput.includes(".")) {
      return;
    }
    this.currentoutput = this.currentoutput.toString() + number.toString();
  }
  chooseOperations(operation) {
    if (this.currentoutput === "") return;
    if (this.previousoutput != "") {
      this.compute();
    }

    this.operation = operation;

    this.previousoutput = this.currentoutput;
    this.currentoutput = " ";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousoutput);
    const curr = parseFloat(this.currentoutput);
    if(isNaN(prev)||isNaN(curr)){
      return
    }
    switch(this.operation){
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '/':
        computation = prev / curr;
        break;
      default: return
    }
    this.currentoutput = computation
    this.operation=undefined
    this.previousoutput= ""
  }
  updateDisplay() {
    currentoutput.innerText = this.currentoutput;
    previousoutput.innerText = this.previousoutput;
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const delButton = document.querySelector("[data-del]");
const acButton = document.querySelector("[data-ac]");
const previousoutput = document.querySelector("[data-previous-output]");
const currentoutput = document.querySelector("[data-current-output]");

const caculator = new Caculator(previousoutput, currentoutput);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    caculator.appendNumber(button.innerText);
    caculator.updateDisplay();
  });
});

operation.forEach((button) => {
  button.addEventListener("click", () => {
    caculator.chooseOperations(button.innerText);
    caculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  caculator.compute();
  caculator.updateDisplay();
});
