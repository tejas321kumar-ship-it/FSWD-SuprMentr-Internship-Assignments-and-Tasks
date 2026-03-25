let history = [];

function toNumber(value) {
  return Number(value);
}

function isInvalidNumber(value) {
  return Number.isNaN(value);
}

function saveHistory(operation, a, b, result) {
  history.push({
    operation: operation,
    firstNumber: a,
    secondNumber: b,
    result: result
  });
}

function add(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  const result = first + second;
  saveHistory('add', first, second, result);
  console.log('Result:', result);
  return result;
}

function subtract(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  const result = first - second;
  saveHistory('subtract', first, second, result);
  console.log('Result:', result);
  return result;
}

function multiply(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  const result = first * second;
  saveHistory('multiply', first, second, result);
  console.log('Result:', result);
  return result;
}

function divide(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  if (second === 0) {
    console.log('Cannot divide by zero');
    return null;
  }

  const result = first / second;
  saveHistory('divide', first, second, result);
  console.log('Result:', result);
  return result;
}

function modulus(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  if (second === 0) {
    console.log('Cannot use modulus with zero');
    return null;
  }

  const result = first % second;
  saveHistory('modulus', first, second, result);
  console.log('Result:', result);
  return result;
}

function power(a, b) {
  const first = toNumber(a);
  const second = toNumber(b);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  const result = first ** second;
  saveHistory('power', first, second, result);
  console.log('Result:', result);
  return result;
}

function squareRoot(a) {
  const first = toNumber(a);

  if (isInvalidNumber(first)) {
    console.log('Please enter a valid number');
    return null;
  }

  if (first < 0) {
    console.log('Square root of negative number is not allowed here');
    return null;
  }

  const result = Math.sqrt(first);
  history.push({
    operation: 'squareRoot',
    firstNumber: first,
    secondNumber: '-',
    result: result
  });
  console.log('Result:', result);
  return result;
}

function percentage(part, total) {
  const first = toNumber(part);
  const second = toNumber(total);

  if (isInvalidNumber(first) || isInvalidNumber(second)) {
    console.log('Please enter valid numbers');
    return null;
  }

  if (second === 0) {
    console.log('Total cannot be zero');
    return null;
  }

  const result = (first / second) * 100;
  saveHistory('percentage', first, second, result);
  console.log('Result:', result + '%');
  return result;
}

function showHistory() {
  if (history.length === 0) {
    console.log('No calculation history yet');
    return;
  }

  console.table(history);
}

function clearHistory() {
  history = [];
  console.log('History cleared');
}

window.calc = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  modulus: modulus,
  power: power,
  squareRoot: squareRoot,
  percentage: percentage,
  showHistory: showHistory,
  clearHistory: clearHistory
};

console.log('Console Challenge loaded. Use calc.add(), calc.subtract(), calc.showHistory(), etc.');
