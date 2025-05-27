import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './Chatbot.css'; 
import { FaSmile, FaPaperPlane } from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    addResponseMessage("Hi! I'm FoodBot 🍽️. How can I assist you today?");
  }, []);

  const handleNewUserMessage = async (message) => {
    let userId = localStorage.getItem("user_id");

    if (!userId) {
      userId = `guest_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("user_id", userId);
    }

    try {
      const res = await fetch('http://localhost:4000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, userId }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      addResponseMessage(data.reply || "Sorry, I couldn't understand that.");
    } catch (error) {
      console.error("Chatbot fetch error:", error);
      addResponseMessage("⚠️ Connection error. Please try again later.");
    }
  };

  const toggleLauncher = () => {
    setIsOpen(prev => !prev);
  };
  

  return (
    <>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="FoodBot"
        subtitle="Need help with food ordering?"
        showCloseButton={true}
        fullScreenMode={false}
        launcher={(handleToggle) => (
          <div
            className={`food-launcher ${isOpen ? 'open' : ''}`}
            onClick={() => {
              handleToggle();
              toggleLauncher();
            }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 1001,
            }}
          >
            🍽️
          </div>
        )}
      />
    </>
  );
}

export default Chatbot;
