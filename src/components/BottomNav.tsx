import { Home, MessageCircle, Users, Settings, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'forums', icon: Users, label: 'Foren' },
    { id: 'create', icon: PlusCircle, label: 'Erstellen' },
    { id: 'chats', icon: MessageCircle, label: 'Chats' },
    { id: 'settings', icon: Settings, label: 'Einstellungen' }
  ];

  return (
    <nav className="absolute bottom-8 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-2 py-2">
      <div className="flex justify-around items-center">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
              activeTab === id 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn(
              "w-6 h-6 transition-transform",
              id === 'create' && "w-7 h-7",
              activeTab === id && "scale-110"
            )} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
