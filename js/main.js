const calc = new Calculator();

const valueEl = document.getElementById("value");
const expressionEl = document.getElementById("expression");
const keysEl = document.querySelector(".keys");

const ACTIONS = {
  clear: () => calc.clear(),
  sign: () => calc.toggleSign(),
  percent: () => calc.percent(),
  backspace: () => calc.backspace(),
  decimal: () => calc.inputDecimal(),
  equals: () => calc.equals(),
};

function render() {
  valueEl.textContent = calc.current;
  valueEl.classList.toggle("display__value--small", calc.current.length > 9);
  expressionEl.textContent = calc.expression;

  document.querySelectorAll("[data-operator]").forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      calc.waitingForOperand && btn.dataset.operator === calc.operator
    );
  });
}

keysEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const { number, operator, action } = btn.dataset;
  if (number !== undefined) calc.inputDigit(number);
  else if (operator) calc.setOperator(operator);
  else if (action && ACTIONS[action]) ACTIONS[action]();
  render();
});

const KEY_MAP = {
  Enter: "equals",
  "=": "equals",
  Escape: "clear",
  Backspace: "backspace",
  ".": "decimal",
  "%": "percent",
};

document.addEventListener("keydown", (e) => {
  if (/^\d$/.test(e.key)) calc.inputDigit(e.key);
  else if (OPERATIONS[e.key]) calc.setOperator(e.key);
  else if (KEY_MAP[e.key]) ACTIONS[KEY_MAP[e.key]]();
  else return;
  e.preventDefault();
  render();
});

render();
