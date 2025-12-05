import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, AlertTriangle, BadgeCheck, Bot } from 'lucide-react';
import { Post, User } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onShare: () => void;
  onAddComment: (content: string) => void;
  currentUser: User | null;
}

export function PostCard({ post, onLike, onShare, onAddComment, currentUser }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const timeAgo = formatDistanceToNow(post.createdAt, { addSuffix: true, locale: de });

  return (
    <article className="bg-card border-b border-border">
      {/* AI Warning Banner */}
      {post.isFlagged && (
        <div className="bg-destructive/10 px-4 py-2 flex items-center gap-2">
          <Bot className="w-4 h-4 text-destructive" />
          <span className="text-xs text-destructive font-medium">{post.flagReason}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{post.author.displayName}</span>
              {post.author.isVerified && (
                <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <p className="px-4 pb-3 text-sm leading-relaxed">{post.content}</p>

      {/* Media */}
      {post.media && (
        <div className={cn(
          "relative",
          post.media.type === 'reel' && "aspect-[9/16]",
          post.media.type !== 'reel' && "aspect-video"
        )}>
          <img
            src={post.media.url}
            alt="Post media"
            className="w-full h-full object-cover"
          />
          {post.media.type === 'reel' && (
            <div className="absolute top-3 right-3 bg-secondary/80 px-2 py-1 rounded-full">
              <span className="text-xs text-secondary-foreground font-medium">Reel</span>
            </div>
          )}
          {post.media.isAiGenerated && (
            <div className="absolute top-3 left-3 bg-destructive/90 px-2 py-1 rounded-full flex items-center gap-1">
              <Bot className="w-3 h-3 text-destructive-foreground" />
              <span className="text-xs text-destructive-foreground font-medium">KI-generiert</span>
            </div>
          )}
        </div>
      )}

      {/* Sources */}
      {post.sources && post.sources.length > 0 && (
        <div className="px-4 py-2 bg-muted/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <AlertTriangle className="w-3 h-3" />
            <span>Quellen: {post.sources.join(', ')}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3">
        <button 
          onClick={onLike}
          className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm">{post.likes.toLocaleString()}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{post.commentsList.length}</span>
        </button>
        <button 
          onClick={onShare}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm">{post.shares}</span>
        </button>
      </div>

      {/* Category Tag */}
      <div className="px-4 pb-3">
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          post.category === 'educational' && "bg-chart-3/20 text-chart-3",
          post.category === 'fun' && "bg-chart-1/20 text-chart-1",
          post.category === 'other' && "bg-muted text-muted-foreground"
        )}>
          #{post.category}
        </span>
      </div>

      {/* Comment Section */}
      {showComments && (
        <CommentSection
          comments={post.commentsList}
          onAddComment={onAddComment}
          currentUser={currentUser}
        />
      )}
    </article>
  );
}
