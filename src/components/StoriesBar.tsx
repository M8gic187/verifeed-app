import { Plus } from 'lucide-react';
import { Story } from '@/types';
import { cn } from '@/lib/utils';

interface StoriesBarProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
  onAddStory: () => void;
}

export function StoriesBar({ stories, onStoryClick, onAddStory }: StoriesBarProps) {
  return (
    <div className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
      {/* Add Story Button */}
      <button 
        onClick={onAddStory}
        className="flex flex-col items-center gap-1 min-w-[64px]"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center">
            <Plus className="w-6 h-6 text-primary" />
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground">Deine Story</span>
      </button>

      {/* Stories */}
      {stories.map((story) => (
        <button
          key={story.id}
          onClick={() => onStoryClick(story)}
          className="flex flex-col items-center gap-1 min-w-[64px]"
        >
          <div className={cn(
            "w-16 h-16 rounded-full p-0.5",
            story.viewed 
              ? "bg-muted" 
              : "bg-gradient-to-br from-primary via-accent-foreground to-primary"
          )}>
            <img
              src={story.author.avatar}
              alt={story.author.displayName}
              className="w-full h-full rounded-full object-cover border-2 border-card"
            />
          </div>
          <span className="text-[10px] text-muted-foreground truncate max-w-[60px]">
            {story.author.username}
          </span>
        </button>
      ))}
    </div>
  );
}
