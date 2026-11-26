const calc = new Calculator();

const valueEl = document.getElementById("value");
const expressionEl = document.getElementById("expression");
const scientificKeysEl = document.getElementById("scientific-keys");
const modeToggleEl = document.getElementById("mode-toggle");
const calculatorEl = document.querySelector(".calculator");

const ACTIONS = {
  clear: () => calc.clear(),
  sign: () => calc.toggleSign(),
  percent: () => calc.percent(),
  backspace: () => calc.backspace(),
  decimal: () => calc.inputDecimal(),
  equals: () => calc.equals(),
  angle: () => calc.toggleAngleMode(),
};

function render() {
  valueEl.textContent = calc.current;
  valueEl.classList.toggle(
    "display__value--small",
    calc.current.length > 9
  );

  expressionEl.textContent = calc.expression;

  const isScientific =
    scientificKeysEl.dataset.enabled === "true";

  scientificKeysEl.hidden = false;
  scientificKeysEl.inert = !isScientific;
  scientificKeysEl.setAttribute("aria-hidden", String(!isScientific));
  scientificKeysEl.classList.toggle("is-open", isScientific);
  scientificKeysEl
    .querySelector('[data-action="angle"]')
    .textContent = calc.angleMode;

  document.querySelectorAll("[data-operator]").forEach((btn) => {
    btn.classList.toggle(
      "is-active",
      calc.waitingForOperand &&
        btn.dataset.operator === calc.operator
    );
  });
}

calculatorEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const {
    number,
    operator,
    action,
    function: functionName,
    constant,
  } = btn.dataset;

  if (number !== undefined) {
    calc.inputDigit(number);
  } else if (operator) {
    calc.setOperator(operator);
  } else if (functionName) {
    calc.applyFunction(functionName);
  } else if (constant) {
    calc.inputConstant(constant);
  } else if (action && ACTIONS[action]) {
    ACTIONS[action]();
  }

  render();
});

modeToggleEl.addEventListener("click", () => {
  const enabled = scientificKeysEl.dataset.enabled === "true";

  scientificKeysEl.dataset.enabled = String(!enabled);
  modeToggleEl.textContent = enabled ? "공학용" : "일반";
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

const SCIENTIFIC_KEY_MAP = {
  s: "sin",
  c: "cos",
  t: "tan",
  S: "asin",
  C: "acos",
  T: "atan",
  q: "sqrt",
  l: "log",
  n: "ln",
  f: "factorial",
  i: "reciprocal",
};

document.addEventListener("keydown", (e) => {
  const scientificFunction = SCIENTIFIC_KEY_MAP[e.key];
  if (
    scientificFunction &&
    scientificKeysEl.dataset.enabled === "true"
  ) {
    calc.applyFunction(scientificFunction);
  } else if (scientificFunction) {
    return;
  } else if (/^\d$/.test(e.key)) {
    calc.inputDigit(e.key);
  } else if (OPERATIONS[e.key]) {
    calc.setOperator(e.key);
  } else if (KEY_MAP[e.key]) {
    ACTIONS[KEY_MAP[e.key]]();
  } else {
    return;
  }

  e.preventDefault();
  render();
});

render();