// components/Chatbot.js
'use client'
import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
        text: "Welcome to the Chatbot! I'm here to assist you with any questions or concerns you may have. Feel free to ask anything, and I'll do my best to help.", 
        sender: 'system' 
    },
    { 
    text: 'Hello! How can I assist you today?', 
    sender: 'bot' 
    },
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    const response = getBotResponse(input);
    setMessages([...messages, newMessage, { text: response, sender: 'bot' }]);

    setInput('');
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (/(hi|hello|hey|good morning|good evening)/.test(message)) {
      return 'Hello! How can I help you today?';
    } else if (/how are you/.test(message)) {
      return "I'm a chatbot, so I don't have feelings, but I'm here to help you!";
    } else if (/what (can|do) you (do|assist)/.test(message)) {
      return 'I can help answer questions, provide information, and assist with various tasks. What do you need assistance with?';
    } else if (/help/.test(message)) {
      return 'Sure, I am here to help. Please specify your issue or question.';
    } else if (/your name/.test(message)) {
      return "I'm your friendly chatbot assistant.";
    } else if (/(hours|operation|open)/.test(message)) {
      return 'Our operating hours are from 9 AM to 5 PM, Monday through Friday.';
    } else if (/contact (support|us)/.test(message)) {
      return 'You can contact our support team at support@example.com or call us at (123) 456-7890.';
    } else if (/thank(s| you)/.test(message)) {
      return "You're welcome! If you have any more questions, feel free to ask.";
    } else if (/bye|goodbye|see you/.test(message)) {
      return 'Goodbye! Have a great day!';
    } else {
      return "I'm not sure how to respond to that. Could you please provide more details or rephrase your question?";
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Simple Chatbot
      </Typography>
      <Paper variant="outlined" sx={{ height: 400, overflowY: 'auto', p: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent:
                message.sender === 'user'
                  ? 'flex-end'
                  : message.sender === 'system'
                  ? 'center'
                  : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor:
                  message.sender === 'user'
                    ? 'primary.main'
                    : message.sender === 'system'
                    ? 'secondary.main'
                    : 'grey.300',
                color:
                  message.sender === 'user'
                    ? 'primary.contrastText'
                    : message.sender === 'system'
                    ? 'secondary.contrastText'
                    : 'text.primary',
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
        {/* Empty div to scroll to */}
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ mt: 2, display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
