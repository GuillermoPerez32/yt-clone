import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useAuthStore } from "../stores";

interface Message {
  id: string;
  user: string;
  text: string;
  isCurrentUser: boolean;
  timestamp: Date;
}

// Mock user names for chat simulation
const mockUsers = [
  "Alex",
  "Taylor",
  "Jordan",
  "Casey",
  "Morgan",
  "Riley",
  "Jamie",
  "Quinn",
];

// Mock messages to start with
const initialMessages: Message[] = [
  {
    id: "1",
    user: "Alex",
    text: "This tutorial is exactly what I needed!",
    isCurrentUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    user: "Taylor",
    text: "Can you explain the TypeScript config again?",
    isCurrentUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
  },
  {
    id: "3",
    user: "Jordan",
    text: "Thanks for the clear explanation!",
    isCurrentUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
  },
];

export function ChatInterface({ videoId }: { videoId: string }) {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate new messages coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser =
        mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomMessages = [
        "Great video!",
        "I'm learning so much from this.",
        "Can someone help me with the setup?",
        "Has anyone tried this with Vue?",
        "The explanation at 2:45 was super helpful.",
        "I'm stuck on the TypeScript part.",
        "Thanks for sharing this!",
      ];
      const randomText =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];

      const newMsg: Message = {
        id: Date.now().toString(),
        user: randomUser,
        text: randomText,
        isCurrentUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMsg]);
    }, 15000); // New message every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("Please sign in to chat");
      return;
    }

    if (!newMessage.trim()) {
      setError("Message cannot be empty");
      return;
    }

    setError("");

    const message: Message = {
      id: Date.now().toString(),
      user: user.email.split("@")[0],
      text: newMessage.trim(),
      isCurrentUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="border rounded-lg overflow-hidden h-[500px] flex flex-col bg-card">
      <div className="p-3 border-b bg-muted/30">
        <h2 className="font-semibold">Live Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${
              message.isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.isCurrentUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {!message.isCurrentUser && (
                <div className="font-semibold text-xs">{message.user}</div>
              )}
              <div className="text-sm break-words">{message.text}</div>
              <div className="text-xs opacity-70 text-right mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3">
        {error && <p className="text-destructive text-xs mb-2">{error}</p>}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg p-1  disabled:cursor-not-allowed disabled:border-muted"
            placeholder={user ? "Type a message..." : "Sign in to chat"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!user}
          />
          <button disabled={!user}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
