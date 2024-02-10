import React from 'react';
import axios from 'axios';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = 'YOUR_SPEECHLY_API_KEY'; // Replace with your actual Speechly API key
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function VoiceChat1() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  console.log("Voice Input: ", transcript, ' --resetTranscript: ', resetTranscript, ' -- : ', listening);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const sendVoiceToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/chatbot/api/messages/', {
        'input': transcript, // Corrected: Call transcript as a function
      });
      console.log('response::: ', response.data);

      // Handle the response or update UI as needed
    } catch (error) {
      console.error('Error sending voice to backend:', error);
    }
  };

  const toggleRecognition = () => {
    if (listening) {
      console.log('------------stop--------------');
      SpeechRecognition.stopListening();
      sendVoiceToBackend();
    } else {
      console.log('------------start--------------');
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div>
      <div>
        <button onClick={toggleRecognition}>
          {listening ? 'Stop Recognition and Send Voice' : 'Start Recognition'}
        </button>
        <button onClick={resetTranscript}>Reset Transcript</button>
      </div>
      <div>
        <p>Transcript: {transcript}</p>
        <p>{listening ? 'Listening...' : 'Not listening'}</p>
      </div>
    </div>
  );
}

export default VoiceChat1;
