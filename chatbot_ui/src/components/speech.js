// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Speech() {
  const [messages, setMessages] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();

//   useEffect(() => {
//     // Fetch initial messages when component mounts
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/chatbot/api/messages/');
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

  const sendUserMessage = async () => {
    // if (transcript) {
    if (true) {  
      try {
        const response = await axios.post('http://localhost:8000/chatbot/api/messages/', {
        role: 'user',
        input: "i am weerarathna from matara town"  // Use 'input' instead of 'content'
        });

        console.log('Response:', response.data);
        
        setMessages([...messages, response.data]);
        // resetTranscript(); // Reset transcript after sending the message
        // fetchMessages(); // Fetch updated messages
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>

      <div>
        <button onClick={SpeechRecognition.startListening}>Start Voice Input</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Voice Input</button>
        <button onClick={sendUserMessage}>Send Voice Message</button>
      </div>
    </div>
  );
}

export default Speech;
