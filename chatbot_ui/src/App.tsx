import React from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/mic';
import PlayButton from './components/play-button';

import Accord from './components/accordian';
import Speech from './components/speech';
import VoiceChat from './components/conversation'
import VoiceChat1 from './components/pollypill';

function App() {
  return (
    <div className="App">

      {/* <Posts /> */}
      {/* <Accord />
      <PlayButton /> */}
      {/* <Speech /> */}
      <VoiceChat />
    </div>
  );
}

export default App;
