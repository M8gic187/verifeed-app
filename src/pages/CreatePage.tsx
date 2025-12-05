import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Image, Video, FileText, Link, AlertCircle, BadgeCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CreatePage() {
  const { user } = useApp();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [sources, setSources] = useState('');

  const handleCreate = () => {
    if (!user?.isVerified) {
      toast({
        title: "Nicht berechtigt",
        description: "Nur verifizierte Nutzer können öffentliche Beiträge erstellen",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte gib einen Text ein",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Beitrag erstellt",
      description: "Dein Beitrag wird von der KI überprüft"
    });
    setContent('');
    setSources('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-card/95 backdrop-blur-lg z-40 px-4 pt-10 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Erstellen</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Posten
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        {/* Verification Warning */}
        {!user?.isVerified && (
          <div className="bg-destructive/10 rounded-xl p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-destructive">Eingeschränkte Funktion</p>
              <p className="text-xs text-muted-foreground mt-1">
                Nur verifizierte Nutzer können öffentliche Beiträge erstellen. 
                Du kannst Stories mit Freunden teilen.
              </p>
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar}
            alt={user?.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{user?.displayName}</span>
              {user?.isVerified && (
                <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">Öffentlicher Beitrag</span>
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Was möchtest du teilen?"
          className="w-full min-h-[150px] bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-lg"
        />

        {/* Sources Input */}
        <div className="mt-4 p-4 bg-muted/50 rounded-xl">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Link className="w-4 h-4" />
            Quellenangaben (Pflicht für verifizierte Nutzer)
          </label>
          <input
            type="text"
            value={sources}
            onChange={(e) => setSources(e.target.value)}
            placeholder="z.B. Nature Magazine, WHO Report..."
            className="w-full bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Media Options */}
        <div className="mt-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">MEDIEN HINZUFÜGEN</p>
          <div className="flex gap-3">
            <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
              <div className="w-12 h-12 bg-chart-3/20 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-chart-3" />
              </div>
              <span className="text-xs font-medium">Bild</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
              <div className="w-12 h-12 bg-chart-1/20 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-chart-1" />
              </div>
              <span className="text-xs font-medium">Video</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
              <div className="w-12 h-12 bg-chart-4/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-chart-4" />
              </div>
              <span className="text-xs font-medium">Dokument</span>
            </button>
          </div>
        </div>

        {/* AI Moderation Notice */}
        <div className="mt-6 p-4 bg-accent rounded-xl">
          <p className="text-xs text-accent-foreground">
            🤖 Alle Beiträge werden automatisch von unserer KI auf Fehlinformationen 
            und unzulässige Inhalte geprüft. Videos werden auf KI-generierte Inhalte analysiert.
          </p>
        </div>
      </div>
    </div>
  );
}
