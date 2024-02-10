import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceChat.css';

function VoiceChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    // Display partial transcript in real-time
    if (transcript !== '') {
      const lastMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;

      if (lastMessage && lastMessage.fromUser) {
        // If the last message is from the user, update its text
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory.slice(0, -1),
          { ...lastMessage, text: transcript },
        ]);
      } else {
        // If the last message is from the bot or there's no previous message, add a new user message
        const newMessage = {
          text: transcript,
          fromUser: true,
        };
        setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
      }
    }

    // Send the whole transcript to backend when the user stops talking
    if (!listening && transcript !== '') {
      sendVoiceToBackend();
    }
  }, [transcript, listening]);

  const speakWithVoices = (utterance, voices) => {
    utterance.voice = voices[0];
    window.speechSynthesis.speak(utterance);
  };
  
  const loadVoices = () => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          resolve(updatedVoices);
          window.speechSynthesis.onvoiceschanged = null; // Remove the event listener
        };
      }
    });
  };

  const sendVoiceToBackend = async () => {
    try {
      const response = await axios.post('http://192.168.8.131/chatbot/api/messages/', {
        input: transcript,
      });
      console.log('-----transcript-----',transcript)
      console.log('-----response-----',response)
  
      const botMessage = {
        text: response.data.content, // Assuming the response from the backend is an object with a content field
        fromUser: false,
      };
    

      setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
      console.log('---------botMessage ------',botMessage.text)
      

      if(botMessage.text.trim() !== ''){
        const utterance = new SpeechSynthesisUtterance(botMessage.text);
        //Load voices and speak
        const voices = await loadVoices();
        speakWithVoices(utterance,voices)
      }

      // Clear the transcript after sending to the backend
      resetTranscript();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  const resetTranscriptHandler = () => {
    console.log('Before reset:', transcript);
    setChatHistory([]);
    resetTranscript();
    console.log('After reset:', transcript);
  };

  return (
    <div className="voice-chat-container">
      <div className="button-container">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseOut={stopRecording}
          className='recognition-button'
        >
          {isRecording ? (<img src="stop.png" alt="Stop Recognition" />) : (<img src="start.png" alt="Start Recognition" />)}
        </button>
        <button onClick={resetTranscriptHandler} className='action-button'><img src='reset.png' alt='Reset chat history'/></button>
        <p className="listening-status">{listening ? <img src='listening.gif' alt='Listening...' /> : ''}</p>
      </div>
      <div className="chat-container">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.fromUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoiceChat;



