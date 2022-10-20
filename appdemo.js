class Caculator {
  constructor(previous, current) {
    this.up = previous;
    this.down = current;
    this.clear();
  }

  clear() {
    this.up = "";
    this.down = "";
    this.operation = 0;
  }
  delete() {
    this.down = "";
    this.up = this.up.slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.up.includes(".")) {
      return;
    }
    if (this.up.includes("=")) {
      this.up.substring(0, this.up.length - 1);
      this.up = "";
      this.down = "";
      this.up = this.up.toString() + number.toString();
      return;
    }
    this.up = this.up.toString() + number.toString();
    this.down = "";
    this.operation = 0;
  }
  chooseOperations(operation) {
    if (this.up == "") {
      if (operation == "/" || operation == "*") {
        return;
      }
    }

    if (this.operation == 1) {
      return;
    }
    // when operation =1 => cannot input more operation
    this.operation = 1;
    if (this.up.includes("=")) {
      this.up.substring(0, this.up.length - 1);
      this.up = this.down.toString() + operation.toString();
      return;
    }
    this.up = this.up.toString() + operation.toString();
    this.down = "";
    //
  }
  compute() {
    let computation;
    computation = eval(this.up);
    this.up = this.up + "=";
    this.down = computation;
  }
  updateDisplay() {
    currentoutput.innerText = this.down;
    previousoutput.innerText = this.up;
  }
}
class HistoryDisplay {
  constructor(up, down) {
    this.historyUp = up;
    this.historyDown = down;
  }
  show() {
    console.log(this.historyUp);
    console.log(this.historyDown);
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const delButton = document.querySelector("[data-del]");
const acButton = document.querySelector("[data-ac]");
const previousoutput = document.querySelector("[data-previous-output]");
const currentoutput = document.querySelector("[data-current-output]");
const hsButton = document.querySelector("[data-hs]");
const imagine = document.querySelector("img");
const caculator = new Caculator(previousoutput, currentoutput);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    caculator.appendNumber(button.innerText);
    caculator.updateDisplay();
    imagine.style.display = "block";
  });
});

operation.forEach((button) => {
  button.addEventListener("click", () => {
    caculator.chooseOperations(button.innerText);
    caculator.updateDisplay();
  });
});

const HistoryArray = [];
equalButton.addEventListener("click", () => {
  caculator.compute();
  caculator.updateDisplay();
  HistoryArray.push(new HistoryDisplay(caculator.up, caculator.down));
  HistoryArray.forEach((array) => {
    array.show();
  });
});
//Diplay history

acButton.addEventListener("click", () => {
  caculator.clear();
  previousoutput.innerText = currentoutput.innerText = "";
  imagine.style.display = "none";
});
delButton.addEventListener("click", () => {
  caculator.delete();
  caculator.updateDisplay();
});

//HsButtoon

