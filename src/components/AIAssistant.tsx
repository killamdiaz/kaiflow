
import { useState } from "react";
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, Copy, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: Array<{
    type: 'sequence' | 'leads' | 'template';
    title: string;
    description: string;
    action: string;
  }>;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm KAIA, your AI assistant for cold email campaigns. I can help you create sequences, find leads, and optimize your outreach. What would you like to work on?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
        suggestions: getAISuggestions(inputText),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('sequence') || lowerInput.includes('email')) {
      return "I can help you create an effective email sequence! Here are some proven templates based on your request. Each sequence is optimized for different industries and use cases.";
    } else if (lowerInput.includes('leads') || lowerInput.includes('find')) {
      return "I can help you find high-quality leads! Let me search for prospects that match your criteria. I'll provide verified contact information and company details.";
    } else if (lowerInput.includes('subject') || lowerInput.includes('line')) {
      return "Great subject lines are crucial for open rates! Here are some high-converting subject line templates that you can customize for your campaign.";
    } else {
      return "I understand you're looking for help with your cold email campaign. I can assist with creating sequences, finding leads, writing subject lines, and optimizing your outreach strategy. What specific area would you like to focus on?";
    }
  };

  const getAISuggestions = (input: string): Array<{type: 'sequence' | 'leads' | 'template', title: string, description: string, action: string}> => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('sequence')) {
      return [
        {
          type: 'sequence',
          title: '3-Step SaaS Founder Sequence',
          description: 'Pain point → Solution → Social proof',
          action: 'Insert into Campaign'
        },
        {
          type: 'sequence', 
          title: '5-Step Enterprise Sequence',
          description: 'Research → Value prop → Case study → Demo → Follow-up',
          action: 'Insert into Campaign'
        }
      ];
    } else if (lowerInput.includes('leads')) {
      return [
        {
          type: 'leads',
          title: 'SaaS Startups (Series A)',
          description: '247 verified leads, hiring marketers',
          action: 'Add to Leads'
        },
        {
          type: 'leads',
          title: 'E-commerce Directors',
          description: '156 leads from mid-market companies',
          action: 'Add to Leads'
        }
      ];
    } else {
      return [
        {
          type: 'template',
          title: 'High-Converting Templates',
          description: 'Browse our top performing email templates',
          action: 'View Templates'
        }
      ];
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-all duration-300 z-50"
      >
        <Bot className="w-6 h-6 text-dark-bg" />
      </button>
    );
  }

  return (
    <div className={`fixed right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'bottom-6' : 'bottom-6 top-20'
    }`}>
      <Card className={`cyber-card backdrop-blur-lg bg-dark-card/90 border-neon-blue/30 shadow-glow ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <CardHeader className="p-4 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-dark-bg" />
              </div>
              <div>
                <CardTitle className="text-dark-text text-sm">KAIA</CardTitle>
                <p className="text-xs text-neon-blue">AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-dark-border rounded"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-dark-muted" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-dark-muted" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-dark-border rounded"
              >
                <X className="w-4 h-4 text-dark-muted" />
              </button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-[420px] overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                      {!message.isUser && (
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-dark-bg" />
                          </div>
                          <span className="text-xs text-dark-muted">KAIA</span>
                          <span className="text-xs text-dark-muted">{formatTime(message.timestamp)}</span>
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-neon-blue text-dark-bg' 
                          : 'bg-dark-bg border border-dark-border text-dark-text'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>

                      {message.isUser && (
                        <div className="text-xs text-dark-muted text-right mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      )}

                      {/* AI Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <div key={index} className="cyber-card p-3 hover:neon-glow transition-all duration-300 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-dark-text text-sm">{suggestion.title}</h4>
                                  <p className="text-xs text-dark-muted">{suggestion.description}</p>
                                </div>
                                <button className="text-neon-blue hover:text-neon-purple transition-colors">
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="mt-2">
                                <button className="text-xs cyber-button py-1 px-3">
                                  {suggestion.action}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-dark-bg" />
                      </div>
                      <div className="bg-dark-bg border border-dark-border rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-dark-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask KAIA anything..."
                  className="flex-1 cyber-input text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="cyber-button p-2"
                  disabled={!inputText.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {['Create sequence', 'Find leads', 'Suggest subject line'].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInputText(prompt)}
                    className="text-xs px-2 py-1 bg-dark-bg border border-dark-border rounded text-dark-muted hover:text-neon-blue hover:border-neon-blue/50 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
