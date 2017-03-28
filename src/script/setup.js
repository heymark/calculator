'use strict';

import calculator from './calc';

require('../style/sass/calculator.scss');

const keypad = document.getElementById('keypad');

keypad.addEventListener('click', function (event) {
  if (event.target && event.target.nodeName == 'BUTTON') {
    const buttonValue = event.target.id;
    calculator.input(buttonValue);
  }
});

document.getElementById('display').classList.add('backlit');

calculator.input('zero');