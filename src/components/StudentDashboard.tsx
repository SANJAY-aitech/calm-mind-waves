
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LogOutIcon, SendIcon, MicIcon, SettingsIcon } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
}

interface StudentDashboardProps {
  username: string;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ username, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${username}! I'm MindMate, your AI wellness companion. How are you feeling today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<'ocean' | 'forest' | 'night'>('ocean');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themes = {
    ocean: {
      background: 'bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-100',
      accent: 'from-blue-400 to-cyan-500',
      particles: 'bg-blue-300/30'
    },
    forest: {
      background: 'bg-gradient-to-br from-green-200 via-emerald-100 to-lime-100',
      accent: 'from-green-400 to-emerald-500',
      particles: 'bg-green-300/30'
    },
    night: {
      background: 'bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-200',
      accent: 'from-purple-400 to-indigo-500',
      particles: 'bg-purple-300/30'
    }
  };

  const currentTheme = themes[theme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand how you're feeling. Remember, it's okay to have difficult emotions. What would help you feel better right now?",
      "Thank you for sharing that with me. Your feelings are valid. Let's explore some coping strategies together.",
      "I hear you. Sometimes talking about our feelings can be the first step toward feeling better. What's been on your mind lately?",
      "That sounds challenging. You're being very brave by reaching out. What kind of support would be most helpful for you right now?",
      "I'm here to listen without judgment. Your mental wellness is important. How can we work together to improve how you're feeling?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateAIResponse(inputMessage),
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleMoodSelect = (mood: string) => {
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood}`,
      sender: 'user',
      timestamp: new Date(),
      mood
    };

    setMessages(prev => [...prev, moodMessage]);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for sharing that you're feeling ${mood}. I'm here to support you through this.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} relative overflow-hidden`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 ${currentTheme.particles} rounded-full animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">🧠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MindMate AI</h1>
              <p className="text-sm text-gray-600">Welcome back, {username}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <div className="flex gap-1">
              {Object.entries(themes).map(([themeName, themeConfig]) => (
                <button
                  key={themeName}
                  onClick={() => setTheme(themeName as any)}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${themeConfig.accent} ${
                    theme === themeName ? 'ring-2 ring-white shadow-lg' : ''
                  } transition-all duration-300 hover:scale-110`}
                  title={`${themeName} theme`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOutIcon size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 h-[calc(100vh-200px)]">
        <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="h-full p-0 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className="flex items-start gap-3 max-w-xs md:max-w-md">
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? `bg-gradient-to-r ${currentTheme.accent} text-white`
                          : 'bg-gray-100 text-gray-800'
                      } shadow-md`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Mood quick actions */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2 mb-3 justify-center">
                {[
                  { emoji: '😊', label: 'happy' },
                  { emoji: '😢', label: 'sad' },
                  { emoji: '😠', label: 'angry' },
                  { emoji: '😰', label: 'anxious' },
                  { emoji: '🤔', label: 'confused' },
                  { emoji: '😴', label: 'tired' }
                ].map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(mood.label)}
                    className="text-2xl hover:scale-125 transition-transform duration-200 p-2 rounded-full hover:bg-gray-100"
                    title={`I'm feeling ${mood.label}`}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>

              {/* Input area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tell me how you're feeling..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-gray-300 focus:border-blue-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`bg-gradient-to-r ${currentTheme.accent} hover:scale-105 transition-all duration-200`}
                >
                  <SendIcon size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
