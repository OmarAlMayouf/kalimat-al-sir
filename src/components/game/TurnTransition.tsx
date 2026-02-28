import { Team } from '@/lib/gameState';
import { useEffect, useState } from 'react';

interface TurnTransitionProps {
  team: Team;
  onComplete: () => void;
}

const TurnTransition = ({ team, onComplete }: TurnTransitionProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in">
      <div className={`
        rounded-2xl px-12 py-8 text-center animate-scale-in
        ${team === 'red' ? 'bg-team-red' : 'bg-team-blue'}
      `}>
        <div className="text-4xl mb-3">🎯</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {team === 'red' ? 'دور الفريق الأحمر' : 'دور الفريق الأزرق'}
        </h2>
        <p className="text-white/80 text-lg">استعدوا!</p>
      </div>
    </div>
  );
};

export default TurnTransition;
