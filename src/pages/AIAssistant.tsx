import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Trash2,
  MessageCircle,
  Heart,
  Stethoscope,
  AlertTriangle
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! I'm here to help with your health-related questions. What would you like to know?";
    }
    
    if (message.includes('symptom') || message.includes('pain') || message.includes('hurt')) {
      return "I understand you're experiencing symptoms. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis. Would you like me to help you find a doctor or would you prefer to describe your symptoms in more detail?";
    }
    
    if (message.includes('emergency') || message.includes('urgent')) {
      return "If this is a medical emergency, please call emergency services immediately at 108 or go to the nearest hospital. I can also help you send an emergency alert through our app.";
    }
    
    if (message.includes('doctor') || message.includes('appointment')) {
      return "I can help you find a doctor! You can browse our list of available doctors, filter by specialization, and book appointments. Would you like me to show you how to access the doctor directory?";
    }
    
    if (message.includes('medicine') || message.includes('medication')) {
      return "For medication-related questions, it's best to consult with a pharmacist or your doctor. I can help you find nearby pharmacies or connect you with healthcare professionals who can provide proper medical advice.";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here to help. Is there anything else you'd like to know about your health or our services?";
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
      return "I can help you with:\n• General health information\n• Finding doctors and specialists\n• Understanding symptoms\n• Emergency guidance\n• App navigation\n• Health tips and advice\n\nWhat would you like to know more about?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question. While I can provide general health information, I recommend consulting with a healthcare professional for personalized medical advice.",
      "I understand your concern. For specific medical issues, it's always best to speak with a qualified doctor. Would you like me to help you find a specialist?",
      "I'm here to help with general health guidance. For detailed medical advice, I'd suggest scheduling a consultation with one of our doctors.",
      "That's a good question. I can provide general information, but for medical concerns, please consult with a healthcare professional."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI health assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const quickActions = [
    { text: "I have symptoms", icon: Stethoscope },
    { text: "Find a doctor", icon: User },
    { text: "Emergency help", icon: AlertTriangle },
    { text: "General health tips", icon: Heart }
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex-shrink-0 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate('/home')} 
              variant="outline" 
              size="icon"
              className="bg-white border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Health Assistant</h1>
                <p className="text-sm text-gray-600">Your intelligent health companion</p>
              </div>
            </div>
          </div>
          <Button
            onClick={clearChat}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-green-600' 
                    : 'bg-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <Card className={`${
                  message.sender === 'user'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-900'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="bg-gray-100 border-gray-200">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="p-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.text)}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <footer className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your health..."
                className="flex-1 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl"
                onKeyPress={handleKeyPress}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                AI responses are for informational purposes only. Consult a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default AIAssistant;
