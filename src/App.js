/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import randomColor from 'randomcolor';
import { useState } from 'react';

// using emotion to set css properties for basic style for my box
const baseBoxStyles = css`
  transition: background-color 0.5s ease;
  background-color: #9e9e9e;
  padding: 60px 20px;
  border-radius: 10px;
  width: 400px;
  height: 400px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 5px 5px 5px;
`;

export default function App() {
  // set State variables for background color, text, and hue/brightness select fields
  const [bgColor, setBgColor] = useState('#ffffff');
  const [text, setText] = useState(
    'Generated Color: <background color hex code>',
  );
  const [brightness, setBrightness] = useState('random');
  const [hue, setHue] = useState('');
  // state variable for generating box
  const [size, setSize] = useState(400);
  // state variable to toggle classes
  const [classes, setClasses] = useState({ inner: '', outer: '' });
  // function to handle class button click
  const handleClick = () => {
    setClasses({ inner: 'y', outer: 'x' });
  };
  // function to update size state variable:
  const handleChange = (e) => {
    setSize(e.target.value);
  };

  // function to set up variables for the generated color and
  // to set up the text content displaying the same color
  const changeColor = () => {
    const newColor = randomColor({
      // use hue only when not empty
      hue: hue || undefined,
      luminosity: brightness,
    });
    setBgColor(newColor);
    setText(`Generated Color: ${newColor}`);
  };

  return (
    <>
      <Global
        styles={css`
          .App {
            background-color: #464646;
            margin: 0;
            padding: 40px;
            height: calc(100vh - 100px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          body {
            margin: 0;
          }

          .x {
            animation: x 5s linear infinite alternate;
          }

          .y {
            animation: y 2s linear infinite alternate;
          }

          @keyframes x {
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes y {
            100% {
              transform: translateY(100%);
            }
          }
          .App > div > p {
            font-size: 25px;
          }
          .App > div > button {
            width: 150px;
            height: 80px;
            font-size: 25px;
            border-radius: 10px;
          }
        `}
      />
      <div className="App">
        <div className={classes.outer}>
          <div // combine the base css settings with dynamic variables inside the JSX with emotion
            className={classes.inner}
            css={css`
              ${baseBoxStyles};
              background-color: ${bgColor};
              width: ${size}px;
              height: ${size}px;
            `}
          >
            <button onClick={changeColor}>Generate</button>
            <br />
            {text}
            <br />
            Hue:
            <select value={hue} onChange={(e) => setHue(e.target.value)}>
              <option value="">None</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
              <option value="monochrome">Monochrome</option>
            </select>
            <br />
            Brightness:
            <select
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            >
              <option value="random">Random</option>
              <option value="bright">Bright</option>
              <option value="dark">Dark</option>
            </select>
            <br />
            Box Size
            <input type="number" value={size} onChange={handleChange} />
            <br />
            <button onClick={handleClick}>Bounce!</button>
          </div>
        </div>
      </div>
    </>
  );
}
