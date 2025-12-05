import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Send, ArrowLeft, Image, Smile } from 'lucide-react';
import { GroupChat } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export function ChatsPage() {
  const { chats, sendMessage, user } = useApp();
  const [selectedChat, setSelectedChat] = useState<GroupChat | null>(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && selectedChat) {
      sendMessage(selectedChat.id, message);
      setMessage('');
    }
  };

  if (selectedChat) {
    return (
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
              {selectedChat.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-semibold">{selectedChat.name}</h1>
              <p className="text-xs text-muted-foreground">
                {selectedChat.members.length} Mitglieder
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {selectedChat.messages.map((msg) => {
            const isOwn = msg.senderId === user?.id;
            const sender = selectedChat.members.find(m => m.id === msg.senderId);
            
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  isOwn ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2",
                  isOwn 
                    ? "bg-primary text-primary-foreground rounded-br-md" 
                    : "bg-muted rounded-bl-md"
                )}>
                  {!isOwn && (
                    <p className="text-xs font-medium text-accent-foreground mb-1">
                      {sender?.displayName}
                    </p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {formatDistanceToNow(msg.createdAt, { addSuffix: true, locale: de })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="absolute bottom-8 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Image className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nachricht schreiben..."
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2.5 bg-primary rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
        <h1 className="text-xl font-bold">Gruppenchats</h1>
        <p className="text-xs text-muted-foreground mt-1">Deine Gruppen und Unterhaltungen</p>
      </header>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
              {chat.avatar}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-semibold">{chat.name}</h3>
              {chat.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage.content}
                </p>
              )}
            </div>
            {chat.lastMessage && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(chat.lastMessage.createdAt, { locale: de })}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
