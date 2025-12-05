import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent p-4">
      <div className="relative w-full max-w-[390px] h-[844px] bg-card rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-secondary">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-secondary rounded-b-2xl z-50" />
        
        {/* Screen content */}
        <div className="h-full w-full overflow-hidden bg-background rounded-[2.5rem]">
          {children}
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-secondary/50 rounded-full" />
      </div>
    </div>
  );
}
