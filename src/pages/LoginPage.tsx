import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Eye, EyeOff, Mail, Lock, User, BadgeCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { login } = useApp();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Felder aus",
        variant: "destructive"
      });
      return;
    }

    if (login(email, password)) {
      toast({
        title: "Willkommen!",
        description: "Du bist jetzt angemeldet"
      });
      onLogin();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/20 via-background to-background">
      {/* Header */}
      <div className="pt-20 pb-8 px-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent mb-2">
          TruthSocial
        </h1>
        <p className="text-sm text-muted-foreground">
          Verifizierte Informationen. Echte Verbindungen.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-card rounded-2xl p-6 shadow-lg">
          {/* Tabs */}
          <div className="flex mb-6 bg-muted rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isLogin ? 'bg-card shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                !isLogin ? 'bg-card shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Registrieren
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Benutzername"
                  className="w-full pl-12 pr-4 py-3.5 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
                className="w-full pl-12 pr-4 py-3.5 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                className="w-full pl-12 pr-12 py-3.5 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {isLogin && (
              <button type="button" className="text-sm text-primary hover:underline">
                Passwort vergessen?
              </button>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </button>
          </form>

          {/* Verification Info */}
          <div className="mt-6 p-4 bg-accent/50 rounded-xl">
            <div className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Verifizierung</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verifizierte Nutzer können öffentliche Beiträge mit Quellenangaben erstellen. 
                  Die Verifizierung erfolgt nach der Registrierung.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-card/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🛡️</span>
            <p className="text-[10px] text-muted-foreground mt-1">KI-Moderation</p>
          </div>
          <div className="bg-card/50 rounded-xl p-3 text-center">
            <span className="text-2xl">📰</span>
            <p className="text-[10px] text-muted-foreground mt-1">Quellenangaben</p>
          </div>
          <div className="bg-card/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🔒</span>
            <p className="text-[10px] text-muted-foreground mt-1">Privat & Sicher</p>
          </div>
        </div>
      </div>
    </div>
  );
}
