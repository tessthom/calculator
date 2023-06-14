import React, { useState } from 'react';
import Wrapper from './components/Wrapper.js';
import Screen from './components/Screen.js';
import ButtonBox from './components/ButtonBox.js';
import Button from './components/Button.js';
import PrideButton from './components/PrideButton.js';

// this array of arrays holds the values for the calculator's buttons
const btnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

// this fn uses regex to add spaces between every 3 digits
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

// this fn uses regex to remove spaces via the replace method
const removeSpaces = (num) => String(num).replace(/\s/g, '');

// main app component
const Calculator = () => {
  // this section sets the initial state for the calculator's screen. sign is the operator, num is the number being entered, and res is the result of the calculation
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  // click even handler for the numbers
  const numClickHandler = (e) => {
    // e is event object
    e.preventDefault();
    const value = e.target.innerHTML; // ref variable for value of button clicked

    if (removeSpaces(calc.num).length < 16) {
      // if length of num is less than 16...
      setCalc({
        // set state of calc aka the screen
        ...calc, // spread operator copies the state of calc
        // set num to...
        num:
          calc.num === 0 && value === '0' // if num is 0 and value is 0...
            ? '0' // set screen to 0
            : removeSpaces(calc.num) % 1 === 0 // if num is an integer...
            ? toLocaleString(Number(removeSpaces(calc.num + value))) // set screen to sum
            : toLocaleString(calc.num + value), // else set screen to num + value
        res: !calc.sign ? 0 : calc.res, // if sign is empty, set res to 0, else set res to res
      });
    }
  };

  // click event handler for decimal point or comma
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num, // if num does not include a decimal point, set num to num + value, else set num to num
    });
  };

  // click event handler for operators: +, -, X, /
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res, // if res is empty and num is not empty, set res to num, else set res to res
      num: 0, // set num to 0
    });
  };

  // click event handler for equals sign
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      // if sign and num are not empty...
      const math = (
        a,
        b,
        sign // math fn takes 3 arguments: a, b, and sign
      ) =>
        sign === '+' // if sign is +...
          ? a + b // add a and b
          : sign === '-' // if sign is -...
          ? a - b // subtract b from a
          : sign === 'X' // if sign is X...
          ? a * b // multiply a and b
          : a / b; // else divide a by b

      setCalc({
        // set the state of calc/screen at the end of the calculation
        ...calc,
        res:
          calc.num === '0' && calc.sign === '/' // if num is 0 and sign is /...
            ? "Can't divide with 0" // display error message
            : toLocaleString(
                // else set result to...
                math(
                  Number(removeSpaces(calc.res)), // convert res to number and remove spaces
                  Number(removeSpaces(calc.num)), // convert num to number and remove spaces
                  calc.sign // set sign to sign
                )
              ),
        sign: '', // set sign to empty string
        num: 0, // set num to 0
      });
    }
  };

  // click event handler for +/- sign
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0, // if num is not empty, set num to num * -1, else set num to 0
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0, // if res is not empty, set res to res * -1, else set res to 0
      sign: '',
    });
  };

  // click event handler for % sign
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0; // if num is not empty, set num to num, else set num to 0
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0; // if res is not empty, set res to res, else set res to 0

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    });
  };

  // click event handler for C/clear button
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />{' '}
      {/* if num is not empty, display num, else display res */}
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          {/* btnValues is an array of arrays. map flattens and maps over it */}
          return (
            <Button
              key={i} // set key to index
              className={btn === '=' ? 'equals' : ''} // if btn is =, set className to equals
              value={btn} // set value to btn
              onClick={
                // set onClick to...
                btn === 'C' // if btn is C...
                  ? resetClickHandler // set onClick to resetClickHandler
                  : btn === '+-' // if btn is +-...
                  ? invertClickHandler // set onClick to invertClickHandler
                  : btn === '%' // if btn is %...
                  ? percentClickHandler // set onClick to percentClickHandler
                  : btn === '=' // if btn is =...
                  ? equalsClickHandler // set onClick to equalsClickHandler
                  : btn === '/' || btn === 'X' || btn === '-' || btn === '+' // if btn is /, X, -, or +...
                  ? signClickHandler // set onClick to signClickHandler
                  : btn === '.' // if btn is . or ,
                  ? commaClickHandler // set onClick to commaClickHandler
                  : numClickHandler // else set onClick to numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
      <PrideButton />
    </Wrapper>
  );
};

export default Calculator;
