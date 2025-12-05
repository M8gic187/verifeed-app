import { X, Heart, Send } from 'lucide-react';
import { Story } from '@/types';
import { useState } from 'react';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onReact: (emoji: string) => void;
}

const emojis = ['❤️', '😂', '😮', '😢', '👏', '🔥'];

export function StoryViewer({ story, onClose, onReact }: StoryViewerProps) {
  const [reply, setReply] = useState('');

  return (
    <div className="fixed inset-0 bg-secondary z-50 flex flex-col">
      {/* Progress bar */}
      <div className="absolute top-12 left-4 right-4 h-1 bg-secondary-foreground/30 rounded-full overflow-hidden">
        <div className="h-full bg-card w-1/3 rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-16">
        <div className="flex items-center gap-3">
          <img
            src={story.author.avatar}
            alt={story.author.displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-card"
          />
          <div>
            <span className="font-semibold text-secondary-foreground text-sm">
              {story.author.displayName}
            </span>
            <p className="text-xs text-secondary-foreground/70">vor 2 Stunden</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-secondary-foreground/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-secondary-foreground" />
        </button>
      </div>

      {/* Story Content */}
      <div className="flex-1 relative">
        <img
          src={story.media.url}
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Reactions */}
      <div className="p-4 space-y-3">
        <div className="flex justify-center gap-4">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onReact(emoji)}
              className="w-12 h-12 bg-secondary-foreground/10 rounded-full flex items-center justify-center text-2xl hover:bg-secondary-foreground/20 transition-colors hover:scale-110"
            >
              {emoji}
            </button>
          ))}
        </div>
        
        {/* Reply input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Antworten..."
            className="flex-1 bg-secondary-foreground/10 rounded-full px-4 py-3 text-secondary-foreground placeholder:text-secondary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="p-3 bg-primary rounded-full hover:bg-primary/90 transition-colors">
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
