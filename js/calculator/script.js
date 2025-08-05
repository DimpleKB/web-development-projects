const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let curInput = '';
let evaluated = false;

const updateDisplay = () => {
  display.value = curInput || '0';
};

const safeEval = expr => {
  try {
    // Avoid eval, use Function
    return Function(`return (${expr})`)();
  } catch (e) {
    return 'Error';
  }
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'CE') {
      curInput = '';
    } else if (value === '⌫') {
      curInput = curInput.slice(0, -1);
    } else if (value === '=') {
      const result = safeEval(curInput);
      curInput = result.toString();
      evaluated = true;
    } else {
      if (evaluated && /[0-9.]/.test(value)) {
        curInput = value;
      } else {
        // Prevent duplicate operators
        const lastChar = curInput[curInput.length - 1];
        if (/[+\-*/%]/.test(lastChar) && /[+\-*/%]/.test(value)) {
          curInput = curInput.slice(0, -1);
        }
        curInput += value;
      }
      evaluated = false;
    }
    updateDisplay();
  });
});

// Keyboard support
document.addEventListener('keydown', e => {
  const key = e.key;

  if (/^[0-9+\-*/%.()]$/.test(key)) {
    if (evaluated && /[0-9.]/.test(key)) {
      curInput = key;
    } else {
      const lastChar = curInput[curInput.length - 1];
      if (/[+\-*/%]/.test(lastChar) && /[+\-*/%]/.test(key)) {
        curInput = curInput.slice(0, -1);
      }
      curInput += key;
    }
    evaluated = false;
  } else if (key === 'Backspace') {
    curInput = curInput.slice(0, -1);
  } else if (key === 'Enter') {
    const result = safeEval(curInput);
    curInput = result.toString();
    evaluated = true;
  } else if (key.toLowerCase() === 'c') {
    curInput = '';
  }

  updateDisplay();
});
