// 새 이항 연산은 여기에 추가하고 index.html 에 data-operator 버튼을 달면 된다.
const OPERATIONS = {
  "+": { symbol: "+", fn: (a, b) => a + b },
  "-": { symbol: "−", fn: (a, b) => a - b },
  "*": { symbol: "×", fn: (a, b) => a * b },
  "/": { symbol: "÷", fn: (a, b) => (b === 0 ? NaN : a / b) },
};

const MAX_DIGITS = 12;

class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.current = "0";
    this.previous = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.expression = "";
  }

  inputDigit(digit) {
    if (this.current === "Error") this.clear();
    if (this.waitingForOperand) {
      this.current = digit;
      this.waitingForOperand = false;
      return;
    }
    if (this.current.replace(/[-.]/g, "").length >= MAX_DIGITS) return;
    this.current = this.current === "0" ? digit : this.current + digit;
  }

  inputDecimal() {
    if (this.current === "Error") this.clear();
    if (this.waitingForOperand) {
      this.current = "0.";
      this.waitingForOperand = false;
      return;
    }
    if (!this.current.includes(".")) this.current += ".";
  }

  backspace() {
    if (this.waitingForOperand || this.current === "Error") return;
    this.current = this.current.slice(0, -1);
    if (this.current === "" || this.current === "-") this.current = "0";
  }

  toggleSign() {
    if (this.current === "0" || this.current === "Error") return;
    this.current = this.current.startsWith("-")
      ? this.current.slice(1)
      : "-" + this.current;
  }

  percent() {
    if (this.current === "Error") return;
    this.current = Calculator.format(parseFloat(this.current) / 100);
  }

  setOperator(op) {
    if (this.current === "Error") return;
    // 연산자를 연속으로 누르면 마지막 것만 반영
    if (this.operator && this.waitingForOperand) {
      this.operator = op;
      this.expression = `${this.previous} ${OPERATIONS[op].symbol}`;
      return;
    }
    if (this.operator) {
      this.compute();
      if (this.current === "Error") return;
    }
    this.previous = this.current;
    this.operator = op;
    this.waitingForOperand = true;
    this.expression = `${this.previous} ${OPERATIONS[op].symbol}`;
  }

  equals() {
    if (!this.operator || this.waitingForOperand) return;
    const expr = `${this.previous} ${OPERATIONS[this.operator].symbol} ${this.current} =`;
    this.compute();
    this.expression = this.current === "Error" ? "" : expr;
  }

  compute() {
    const a = parseFloat(this.previous);
    const b = parseFloat(this.current);
    const result = OPERATIONS[this.operator].fn(a, b);
    this.current = Number.isFinite(result) ? Calculator.format(result) : "Error";
    this.previous = null;
    this.operator = null;
    this.waitingForOperand = true;
  }

  // 0.1 + 0.2 같은 부동소수점 오차를 잘라 표시용 문자열로 변환
  static format(num) {
    const rounded = parseFloat(num.toPrecision(MAX_DIGITS));
    const str = String(rounded);
    return str.replace(/[-.]/g, "").length > MAX_DIGITS
      ? rounded.toExponential(6)
      : str;
  }
}
