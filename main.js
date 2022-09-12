const numbersButton = document.querySelectorAll("[data-number]");
const operatorsButton = document.querySelectorAll("[data-operator]");
const deleteBtn = document.querySelector("[data-clear]");
const currentDisplay = document.querySelector("[data-current-operand]");
const previousDisplay = document.querySelector("[data-previous-operand]");
const inverseButton = document.querySelector("[data-inverse]");
const equalButton = document.querySelector("[data-equals]")


inverseButton.addEventListener('click', () => {
  calculator.inverse()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})


operatorsButton.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay
    console.log(button.innerText)
  })
})

numbersButton.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log(button.innerText)
  });
});

class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.currentDisplay = currentDisplay;
    this.previousDisplay = previousDisplay;
    this.clear();
  }

  clear() {

    previousDisplay.innerText = '000'
    currentDisplay.innerText = '0000'
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined

  }
  delete() {

  }

  inverse() {

    this.currentOperand = this.currentOperand * -1

  }


  appendNumber(number) {

    if (number === '.' && this.currentOperand.includes('.')) return

    this.currentOperand = this.currentOperand + number.toString()
  }

  chooseOperation(operation) {

    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
    this.compute()
     }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  compute() {

    let computation
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(current) || isNaN(prev)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case 'X':
        computation = prev * current
        break
      case '-':
        computation = prev - current
        break
      case '/':
        computation = prev / current
        break
      case '%':
        computation = prev % current
        break

      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''

  }

  updateDisplay() {

    this.currentDisplay.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousDisplay.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousDisplay.innerText = ''
    }



  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('br', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

}
const calculator = new Calculator(previousDisplay, currentDisplay)


document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }
});
