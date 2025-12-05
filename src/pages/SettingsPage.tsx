import { useApp } from '@/context/AppContext';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { User, Shield, Sparkles, Eye, LogOut, ChevronRight, Bot, Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function SettingsPage() {
  const { user, contentSettings, updateContentSettings, logout } = useApp();
  const [newKeyword, setNewKeyword] = useState('');
  const { toast } = useToast();

  const addKeyword = () => {
    if (newKeyword.trim() && !contentSettings.customKeywords.includes(newKeyword.trim())) {
      updateContentSettings({
        customKeywords: [...contentSettings.customKeywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    updateContentSettings({
      customKeywords: contentSettings.customKeywords.filter(k => k !== keyword)
    });
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Abgemeldet", description: "Du wurdest erfolgreich abgemeldet" });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
        <h1 className="text-xl font-bold">Einstellungen</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Profile Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.displayName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{user?.displayName}</h2>
                {user?.isVerified ? (
                  <Badge variant="default" className="text-xs">Verifiziert</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Nicht verifiziert</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Content Filter Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            CONTENT-FILTER
          </h3>

          {/* Show Reels */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-1/20 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="font-medium text-sm">Reels anzeigen</p>
                <p className="text-xs text-muted-foreground">Kurze Videos im Feed</p>
              </div>
            </div>
            <Switch
              checked={contentSettings.showReels}
              onCheckedChange={(checked) => updateContentSettings({ showReels: checked })}
            />
          </div>

          {/* Block AI Content */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-sm">KI-Content blockieren</p>
                <p className="text-xs text-muted-foreground">KI-generierte Inhalte ausfiltern</p>
              </div>
            </div>
            <Switch
              checked={contentSettings.blockAiContent}
              onCheckedChange={(checked) => updateContentSettings({ blockAiContent: checked })}
            />
          </div>
        </div>

        {/* Algorithm Section */}
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            ALGORITHMUS-EINSTELLUNGEN
          </h3>

          <div className="space-y-2">
            {(['educational', 'fun', 'other', 'custom'] as const).map((type) => (
              <button
                key={type}
                onClick={() => updateContentSettings({ algorithmType: type })}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-colors",
                  contentSettings.algorithmType === type
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted hover:bg-muted/80 border-2 border-transparent"
                )}
              >
                <div className="text-left">
                  <p className="font-medium text-sm">
                    {type === 'educational' && '📚 Educational'}
                    {type === 'fun' && '🎉 Fun & Entertainment'}
                    {type === 'other' && '🌐 Allgemein'}
                    {type === 'custom' && '🎯 Eigene Keywords'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {type === 'educational' && 'Bildungsinhalte priorisieren'}
                    {type === 'fun' && 'Unterhaltung & Humor'}
                    {type === 'other' && 'Gemischter Content'}
                    {type === 'custom' && 'Nach deinen Interessen filtern'}
                  </p>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2",
                  contentSettings.algorithmType === type
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                )} />
              </button>
            ))}
          </div>

          {/* Custom Keywords */}
          {contentSettings.algorithmType === 'custom' && (
            <div className="mt-4 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm font-medium mb-3">Deine Keywords:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {contentSettings.customKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {keyword}
                    <button 
                      onClick={() => removeKeyword(keyword)}
                      className="hover:bg-primary/30 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  placeholder="Neues Keyword..."
                  className="flex-1"
                />
                <button
                  onClick={addKeyword}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Moderation Info */}
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            KI-MODERATION
          </h3>
          <div className="bg-accent/50 rounded-xl p-4">
            <p className="text-sm">
              Unsere KI prüft automatisch alle Inhalte auf:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• KI-generierte Videos & Bilder</li>
              <li>• Fehlinformationen & Fake News</li>
              <li>• Unangemessene Inhalte</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Gemeldete Inhalte werden überprüft und ggf. entfernt.
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Abmelden</span>
          </button>
        </div>
      </div>
    </div>
  );
}
