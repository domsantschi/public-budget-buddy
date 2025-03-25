import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageSquare, Send } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
interface Message {
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([{
    type: "ai",
    content: "Hello! I'm your budget assistant. How can I help you today?",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        type: "ai",
        content: "Thank you for your question. Based on historical data and current trends, I recommend reviewing the budget allocation for infrastructure development. Would you like me to provide more detailed analysis?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  return <Card className="w-full h-full flex flex-col animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Interactive Explainer</h3>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>)}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t mt-auto">
        <div className="flex space-x-2">
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question about the budget..." className="flex-1" />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>;
};
export default ChatInterface;