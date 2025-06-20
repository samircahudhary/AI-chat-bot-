import React, { useState } from 'react';
import runGemini from './gemini.js';
import './App.css';
import ai from './image/ai.png';
import aibackground from './image/aibackground.gif';
 

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
 

  const synth = window.speechSynthesis;
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  const handleMicClick = () => {
   
    setTimeout(() => setShowGif(false), 3000); // hide after 3 seconds

    recognition.start();

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setQuestion(spoken);

      const reply = await runGemini(spoken);
      setAnswer(reply);
      speak(reply);
    };

    recognition.onerror = () => {
      alert('Speech recognition error');
    };
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-GB';
    synth.speak(utterance);
  };

  return (
    <div
      className="backgroundimg"
      style={{
        backgroundImage: `url(${aibackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '120vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="maindiv">
         <h1>🎙️ HINDI /ENGLISH AI Voice Assistant</h1>
        <img id='img' src={ai} alt="AI Logo" />
         
        
        <button onClick={handleMicClick}>🎤 Click Here</button>

       

        <p><strong>You:</strong> {question}</p>
        <p><strong>ULTRON:</strong> {answer}</p>
      </div>
    </div>
  );
}

export default App;
