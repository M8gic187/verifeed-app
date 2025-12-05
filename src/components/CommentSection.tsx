import { useState } from 'react';
import { Comment, User } from '@/types';
import { Heart, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  currentUser: User | null;
}

export function CommentSection({ comments, onAddComment, currentUser }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const displayedComments = isExpanded ? comments : comments.slice(0, 2);

  return (
    <div className="px-4 pb-3 border-t border-border">
      {/* Comment Input */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 py-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.displayName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Kommentar schreiben..."
            className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="p-2 text-primary disabled:text-muted-foreground transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {displayedComments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <img
                src={comment.author.avatar}
                alt={comment.author.displayName}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-muted rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{comment.author.displayName}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: de })}
                  </span>
                </div>
                <p className="text-sm mt-0.5">{comment.content}</p>
                <button className="flex items-center gap-1 mt-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="w-3 h-3" />
                  <span className="text-[10px]">{comment.likes}</span>
                </button>
              </div>
            </div>
          ))}

          {comments.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? 'Weniger anzeigen' : `Alle ${comments.length} Kommentare anzeigen`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
