'use strict';

import calculator from './calc.js';

require('../style/sass/calculator.scss');

const buttons = document.getElementsByTagName('button');

for (const button of buttons) {
  const buttonValue = button.id;
  button.addEventListener('click', function (event) {
    calculator.input(buttonValue);
  });
}

document.getElementById('display').classList.add('backlit');

calculator.input('zero');