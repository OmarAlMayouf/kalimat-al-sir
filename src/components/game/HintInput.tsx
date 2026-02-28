import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Team } from '@/lib/gameState';

interface HintInputProps {
  currentTeam: Team;
  onSubmitHint: (word: string, count: number) => void;
}

const HintInput = ({ currentTeam, onSubmitHint }: HintInputProps) => {
  const [hintWord, setHintWord] = useState('');
  const [hintCount, setHintCount] = useState(1);

  const handleSubmit = () => {
    if (!hintWord.trim()) return;
    onSubmitHint(hintWord.trim(), hintCount);
    setHintWord('');
    setHintCount(1);
  };

  return (
    <div className={`
      mx-auto max-w-md p-4 rounded-xl border-2 animate-fade-in
      ${currentTeam === 'red' ? 'border-team-red/30 bg-team-red/5' : 'border-team-blue/30 bg-team-blue/5'}
    `}>
      <h3 className="text-sm font-bold text-center mb-3 text-muted-foreground">
        🕵️ أدخل التلميح
      </h3>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-1 block">الكلمة</label>
          <Input
            value={hintWord}
            onChange={(e) => setHintWord(e.target.value)}
            placeholder="التلميح..."
            className="h-10 text-center"
            dir="rtl"
          />
        </div>
        <div className="w-20">
          <label className="text-xs text-muted-foreground mb-1 block">العدد</label>
          <Input
            type="number"
            min={1}
            max={8}
            value={hintCount}
            onChange={(e) => setHintCount(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
            className="h-10 text-center"
          />
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!hintWord.trim()}
          className="h-10"
        >
          ابدأ الدور
        </Button>
      </div>
    </div>
  );
};

export default HintInput;
