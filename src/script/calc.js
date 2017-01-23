'use strict';

import Big from 'big.js';

let state = getNewStateObject();

// Decimal concatenator
// decimal :: String -> String
function decimal (x) { 
  return x.includes('.') 
    ? x 
    : x + '.'; 
}

// Digit concatenator
// digit :: Number -> Number -> String
function digit (x) {
  return function (y) {
    return y === undefined || y === '0' 
      ? x.toString() 
      : y.toString() + x.toString();
  }
}

// Digits
const DIGITS = {
  one:    digit(1),
  two:    digit(2),
  three:  digit(3),
  four:   digit(4),
  five:   digit(5),
  six:    digit(6),
  seven:  digit(7),
  eight:  digit(8),
  nine:   digit(9),
  zero:   digit(0)
};

// Width of calculator display in characters (assumes monospaced display font)
let displayWidth = getDisplayWidth();

// Evaluate the expression represented by state and return its result
// evaluate :: State Object -> Big Object
function evaluate (currentState) {
  return Big(currentState.memory.toNumber())[currentState.operator](currentState.workingValue.toNumber());
}

// Determine whether inputString completely fills the display
// fillsDisplay :: String -> Boolean
function fillsDisplay(inputString) {
  return ZERO_WIDTH_DECIMAL
    ? (!inputString.includes('.') && inputString.length === displayWidth) ||
      ( inputString.includes('.') && inputString.length === displayWidth + 1)
    : inputString.length === displayWidth
}

// Determine whether inputString fits within the display
// fitsDisplay :: String -> Boolean
function fitsDisplay(inputString) {
  return ZERO_WIDTH_DECIMAL
    ? (!inputString.includes('.') && inputString.length <= displayWidth) ||
      ( inputString.includes('.') && inputString.length <= displayWidth + 1)
    : inputString.length <= displayWidth
}

// Flag for continuous input
let followsEquality = false;

// Format a string to fit the calculator's display, as defined by displayWidth
// getDisplayString :: String -> String
function getDisplayString (inputString) {
  // If input string fits display, return as-is
  if (fitsDisplay(inputString)) return inputString.toUpperCase();
  // Otherwise, prepare to convert to scientific notation
  const inputValue = Big(inputString);
  // Determine the number of display characters already in use
  const spaceForLeadingNegation = inputValue.s > 0 ? 0 : 1;
  const spaceForLeadingDigit    = 1;
  const spaceForDecimal         = ZERO_WIDTH_DECIMAL ? 0 : 1;
  const spaceForE               = 1;
  const spaceForExponentSign    = 1;
  const spaceForExponent        = inputValue.e.toString().length - (inputValue.e < 0 ? 1 : 0)
  const charactersInUse         = spaceForLeadingNegation
                                + spaceForLeadingDigit
                                + spaceForDecimal
                                + spaceForE
                                + spaceForExponentSign
                                + spaceForExponent;
  // Return string in scientific notation, rounded to fit the available display
  const availableDisplay = displayWidth - charactersInUse;
  return inputValue.toExponential(availableDisplay).toUpperCase();
}

// Determine the width of the display in characters (assumes monospaced display font)
// getDisplayWidth :: () -> Number
function getDisplayWidth () {
  const display = document.getElementById('display');
  const elementWidth = parseFloat(window.getComputedStyle(display).getPropertyValue("width"));
  const rightPadding = parseFloat(window.getComputedStyle(display).getPropertyValue("padding-right"));
  const useableWidth = elementWidth - (2 * rightPadding);
  return Math.floor(useableWidth / 36);
}

// Determine the type (digit, decimal, operator, etc) of a given input string
// getInputType :: String -> String
function getInputType (input) {
  if (input === 'clearEntry')                            return 'clearEntry';
  if (input === 'point')                                 return 'decimal';
  if (DIGITS.hasOwnProperty(input))                      return 'digit';
  if (input === 'equals')                                return 'equality';
  if (input === 'negative')                              return 'negation';
  if (['plus', 'minus', 'times', 'div'].includes(input)) return 'operator';
  return 'invalid';
}

// Get new buffer object. Buffer stores a series of functions corresponding to calculator input, 
// e.g. [ digit(3), decimal, digit(1), digit(4) ], and converts them to strings (e.g. '3.14') or
// numbers (e.g. 3.14) on request. Initial values, if supplied, are prepended to the buffer.
// getNewBufferObject :: Functions -> State Object
function getNewBufferObject (...initialValues) {
  let bufferObject = {
    contents: [...initialValues],
    toNumber: () => { return parseFloat(bufferObject.toString(bufferObject.contents)) },
    toString: (buffer = bufferObject.contents) => {
      const functions = [...buffer];
      const last = functions.pop();
      return functions.length > 0
        ? last(bufferObject.toString(functions))
        : last();
    }
  }
  return bufferObject;
}

// Get new state object. If an existing state object is passed in, its values will be used.
// getNewStateObject :: State Object -> State Object
function getNewStateObject (desiredState = { m: [digit(0)], o: 'plus', v: [digit(0)] }) {
  let stateObject = {
    memory:       getNewBufferObject(...desiredState.m),
    operator:     desiredState.o,
    workingValue: getNewBufferObject(...desiredState.v)
  };
  return stateObject;
}

// Handle '.' keypress
// handleDecimal :: State Object -> State Object
function handleDecimal (currentState) {
  return getNewStateObject({
    m: currentState.memory.contents,
    o: currentState.operator,
    v: currentState.workingValue.contents.concat(decimal)
  });
}

// Handle digit keypress
// handleDigit :: (State Object, String) -> State Object
function handleDigit (currentState, value) {
  const input = DIGITS[value];
  if (followsEquality) {
    followsEquality = false;
    return getNewStateObject({
      m: [digit(0)],
      o: 'plus',
      v: currentState.workingValue.contents.concat(input)
    });
  }
  return getNewStateObject({
    m: currentState.memory.contents,
    o: currentState.operator,
    v: currentState.workingValue.contents.concat(input)
  });
}

// Handle '=' keypress
// handleEquals :: State Object -> State Object
function handleEquals (currentState) {
  followsEquality = true;
  return getNewStateObject({
    m: currentState.workingValue.contents.length > 1
     ? [digit(evaluate(currentState))]
     : currentState.memory.contents,
    o: currentState.operator,
    v: [digit(0)]
  });
}

// Handle '±' keypress
// handleNegation :: State Object -> State Object
function handleNegation (currentState) {
  if (followsEquality) return getNewStateObject({
    m: currentState.memory.contents.concat(negate),
    o: currentState.operator,
    v: currentState.workingValue.contents
  });
  return getNewStateObject({
    m: currentState.memory.contents,
    o: currentState.operator,
    v: currentState.workingValue.contents.concat(negate)
  });
}

// Handle operator keypress
// handleOperator :: (State Object, String) -> State Object
function handleOperator (currentState, operator) {
  if (followsEquality) followsEquality = false;
  return getNewStateObject({
    m: currentState.workingValue.contents.length > 1
     ? [digit(evaluate(currentState))]
     : currentState.memory.contents,
    o: operator,
    v: [digit(0)]
  });
}

// Change sign +/-
// negate :: String -> String
const negate = x => x.search(/[^0.]/) > -1
  ? x.includes('-') ? x.slice(1) : '-' + x
  : x;

// Toggle display off or on
// toggleDisplay :: String -> Undefined (implicit)
function toggleDisplay (desiredState) {
  const display = document.getElementById('display');
  void display.offsetWidth; // Trigger reflow
  desiredState === 'off'
    ? display.classList.add('hidden')
    : display.classList.remove('hidden');
}

// Handle input (calls updateState and updateDisplay)
// updateCalculator :: String -> Undefined (implicit)
function updateCalculator (keyPress) {
  try {
    state = updateState(keyPress, state);
    updateDisplay(state);
  }
  catch (e) {
    state = getNewStateObject();
    updateDisplay(state, 'ERROR');
  }
}

// Update display
// updateDisplay :: (State Object, String) -> Undefined (implicit)
function updateDisplay (currentState, error) {
  // Hide display
  toggleDisplay('off');
  // Update display element
  if (error) {
    document.getElementById('display').innerHTML = error;
  } else {
    document.getElementById('display').innerHTML = currentState.workingValue.contents.length > 1
      ? getDisplayString(currentState.workingValue.toString())
      : getDisplayString(currentState.memory.toString());
  }
  // Show display
  toggleDisplay('on');
}

// Update state
// updateState :: (State Object, String) -> State Object
function updateState (input, currentState) {
  const inputType = getInputType(input);
  // Guard: if display is full, ignore input that increases character count
  if (fillsDisplay(getDisplayString(currentState.workingValue.toString())) && 
     ['decimal', 'digit', 'negation'].includes(inputType)) { return currentState; }
  // Handle valid input
  if (inputType === 'decimal')    return handleDecimal(currentState);
  if (inputType === 'digit')      return handleDigit(currentState, input);
  if (inputType === 'equality')   return handleEquals(currentState);
  if (inputType === 'negation')   return handleNegation(currentState);
  if (inputType === 'operator')   return handleOperator(currentState, input);
  // Handle request to clear current input
  if (inputType === 'clearEntry') return getNewStateObject({
  m: currentState.memory.contents,
  o: currentState.operator,
  v: [digit(0)] 
  });
  // For all other input, return blank state
  return getNewStateObject();
}

// If using a display font with a zero-width decimal character, set to true to 
// prevent decimal from counting against available display characters
const ZERO_WIDTH_DECIMAL = true;

export default { input: updateCalculator };