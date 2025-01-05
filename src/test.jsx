import React, { useState } from 'react';
import { translateText } from './translateService';

function Test() {
  const [texts] = useState([
    'Welcome to our website',
    'How are you?',
    'This is a translation demo',
  ]);
  const [translatedTexts, setTranslatedTexts] = useState();

  const handleTranslate = async () => {
    const results = await translateText();
    setTranslatedTexts(results);
  };

  return (
    <div>
      <h1>Original Texts</h1>
      <ul>
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>

      <h1>Translated Texts</h1>
      <ul>
        
          <li>{translatedTexts}</li>

      </ul>

      <button onClick={() => handleTranslate('en')}>Translate to English</button>
      <br />
      <button onClick={() => handleTranslate('vi')}>Translate to Vietnamese</button>
    </div>
  );
}

export default Test;
