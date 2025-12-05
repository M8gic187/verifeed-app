import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StoriesBar } from '@/components/StoriesBar';
import { PostCard } from '@/components/PostCard';
import { StoryViewer } from '@/components/StoryViewer';
import { Story } from '@/types';
import { Bell, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FeedPage() {
  const { stories, getFilteredPosts, likePost, reactToStory, addComment, user } = useApp();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const { toast } = useToast();
  const filteredPosts = getFilteredPosts();

  const handleShare = () => {
    toast({
      title: "Teilen",
      description: "Wähle Gruppenchat oder Forum zum Teilen"
    });
  };

  const handleAddStory = () => {
    toast({
      title: "Story erstellen",
      description: "Diese Funktion ist im Prototyp noch nicht verfügbar"
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            discuzz.
          </h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <StoriesBar 
          stories={stories} 
          onStoryClick={setSelectedStory}
          onAddStory={handleAddStory}
        />
        
        <div className="divide-y divide-border">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => likePost(post.id)}
              onShare={handleShare}
              onAddComment={(content) => addComment(post.id, content)}
              currentUser={user}
            />
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onReact={(emoji) => {
            reactToStory(selectedStory.id, emoji);
            toast({ title: "Reaktion gesendet", description: emoji });
          }}
        />
      )}
    </div>
  );
}
