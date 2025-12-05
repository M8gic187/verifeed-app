import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockForums } from '@/data/mockData';
import { ArrowUp, ArrowDown, MessageCircle, Share2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

export function ForumsPage() {
  const { threads, voteThread } = useApp();
  const [selectedForum, setSelectedForum] = useState<string | null>(null);

  const filteredThreads = selectedForum 
    ? threads.filter(t => t.forumId === selectedForum)
    : threads;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
        <h1 className="text-xl font-bold">Foren</h1>
        <p className="text-xs text-muted-foreground mt-1">Diskutiere über Themen die dich interessieren</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Forums List */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">BELIEBTE FOREN</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedForum(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                !selectedForum 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Alle
            </button>
            {mockForums.map((forum) => (
              <button
                key={forum.id}
                onClick={() => setSelectedForum(forum.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                  selectedForum === forum.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <span>{forum.icon}</span>
                <span>{forum.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Threads */}
        <div className="divide-y divide-border">
          {filteredThreads.map((thread) => (
            <article key={thread.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex gap-3">
                {/* Vote buttons */}
                <div className="flex flex-col items-center gap-1">
                  <button 
                    onClick={() => voteThread(thread.id, true)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                  >
                    <ArrowUp className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </button>
                  <span className="text-sm font-semibold">
                    {thread.upvotes - thread.downvotes}
                  </span>
                  <button 
                    onClick={() => voteThread(thread.id, false)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <ArrowDown className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-accent-foreground">
                      {thread.forumName}
                    </span>
                    <span>•</span>
                    <span>von {thread.author.username}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(thread.createdAt, { addSuffix: true, locale: de })}</span>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {thread.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {thread.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{thread.comments} Kommentare</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Teilen</span>
                    </button>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
