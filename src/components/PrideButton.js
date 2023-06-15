import React, { useState, useEffect } from 'react';
import './PrideButton.css';
// all glitter images CC0 with no noted author
import goldGlitter from '../images/gold_glitter.jpg';
import redGlitter from '../images/red_glitter.jpg';
import grayGlitter from '../images/gray_glitter.jpg';

function PrideButton() {
  const [isPride, setIsPride] = useState(false); // set initial state of isPride to false

  const handleClick = () => {
    setIsPride(!isPride); // toggle isPride
  };

  const handleStyleChange = () => {
    const wrapper = document.querySelector('.wrapper');
    const buttons = document.querySelectorAll('button');
    const clearBtn = document.querySelector('button:first-of-type');
    const prideBtn = document.querySelector('.prideButton');

    if (isPride) {
      // rainbow gradient
      document.body.style.background =
        'linear-gradient(to right bottom, red, orange, yellow, green, blue, indigo, violet)';
      // gold glitter for buttons
      buttons.forEach((button) => {
        button.style.backgroundImage = `url(${goldGlitter})`;
      });
      // gray glitter for wrapper
      wrapper.style.backgroundImage = `url(${grayGlitter})`;
      // red glitter for clear button
      clearBtn.style.backgroundImage = `url(${redGlitter})`;
      // gray glitter for pride button
      prideBtn.style.backgroundImage = `url(${grayGlitter})`;
      // change text of button to 'Back to Basics'
      prideBtn.innerHTML = 'Back to Basics &#x1F44B;';
    } else {
      // reset buttons, wrapper, clearBtn, prideBtn back to original styles
      document.body.style.background = '';
      buttons.forEach((button) => {
        button.style.backgroundImage = '';
      });
      wrapper.style.backgroundImage = '';
      clearBtn.style.backgroundImage = '';
      prideBtn.style.backgroundImage = '';
      prideBtn.innerHTML = 'Make it Pride &#x1F308;';
    }
  };

  // useEffect hook to handle style change
  useEffect(() => {
    handleStyleChange();
  });

  return (
    // call handleClick on click, which toggles isPride and calls handleStyleChange
    <button className="prideButton" onClick={handleClick}>
      Make it Pride &#x1F308;
    </button>
  );
}

export default PrideButton;
