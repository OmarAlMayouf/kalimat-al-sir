import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LobbySettings, TIME_OPTIONS, TimeDuration } from "@/lib/gameState";
import { Timer } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

const SmSwitch = (props: ComponentPropsWithoutRef<typeof Switch>) => (
  <Switch
    {...props}
    className="h-4 w-8 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:-translate-x-4"
  />
);

interface LobbyTimerConfigProps {
  settings: LobbySettings;
  isHost: boolean;
  onToggleTimeLimit: () => void;
  onToggleSpymasterTimer: () => void;
  onToggleNormalTimer: () => void;
  onSetSpymasterDuration: (duration: TimeDuration) => void;
  onSetNormalDuration: (duration: TimeDuration) => void;
}

const DurationSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: TimeDuration;
  onChange: (v: TimeDuration) => void;
  disabled: boolean;
}) => (
  <Select
    value={String(value)}
    onValueChange={
      disabled ? undefined : (v) => onChange(Number(v) as TimeDuration)
    }
    disabled={disabled}
  >
    <SelectTrigger className="h-7 text-xs w-28 rounded-lg border-border/60">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {TIME_OPTIONS.map((opt) => (
        <SelectItem key={opt.value} value={String(opt.value)}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const LobbyTimerConfig = ({
  settings,
  isHost,
  onToggleTimeLimit,
  onToggleSpymasterTimer,
  onToggleNormalTimer,
  onSetSpymasterDuration,
  onSetNormalDuration,
}: LobbyTimerConfigProps) => {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Timer className="w-4 h-4 text-muted-foreground" />
          <span>إعدادات الوقت</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {settings.timeLimitEnabled ? "مفعّل" : "معطّل"}
          </span>
          <SmSwitch
            checked={settings.timeLimitEnabled}
            onCheckedChange={isHost ? onToggleTimeLimit : undefined}
            disabled={!isHost}
            aria-label="تفعيل الوقت المحدود"
          />
        </div>
      </div>

      {/* Child controls */}
      {settings.timeLimitEnabled && (
        <div className="space-y-3 pt-2 border-t border-border/40">
          {/* Spymaster row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SmSwitch
                checked={settings.spymasterTimerEnabled}
                onCheckedChange={isHost ? onToggleSpymasterTimer : undefined}
                disabled={!isHost}
              />
              <span className="text-xs text-muted-foreground">رئيس الفريق</span>
            </div>
            <DurationSelect
              value={settings.spymasterDuration}
              onChange={onSetSpymasterDuration}
              disabled={!isHost || !settings.spymasterTimerEnabled}
            />
          </div>

          {/* Normal players row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SmSwitch
                checked={settings.normalTimerEnabled}
                onCheckedChange={isHost ? onToggleNormalTimer : undefined}
                disabled={!isHost}
              />
              <span className="text-xs text-muted-foreground">
                اللاعبون العاديون
              </span>
            </div>
            <DurationSelect
              value={settings.normalDuration}
              onChange={onSetNormalDuration}
              disabled={!isHost || !settings.normalTimerEnabled}
            />
          </div>
        </div>
      )}

      {!isHost && (
        <p className="text-[10px] text-muted-foreground/60 text-center">
          يمكن للمضيف فقط تعديل الإعدادات
        </p>
      )}
    </div>
  );
};

export default LobbyTimerConfig;
