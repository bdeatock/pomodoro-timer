import type { TimerMode } from "../../app";
import ModeSwitchButton from "./mode-switch-button";

interface ModeSwitcherProps {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, setMode }) => (
  <div className="flex h-12 gap-2 rounded-lg bg-foreground px-2 font-mono">
    <ModeSwitchButton
      mode="focus"
      setMode={setMode}
      colour="bg-focus-darker"
      currentMode={mode}
    />
    <ModeSwitchButton
      mode="short break"
      setMode={setMode}
      colour="bg-short-break"
      currentMode={mode}
    />
    <ModeSwitchButton
      mode="long break"
      setMode={setMode}
      colour="bg-long-break"
      currentMode={mode}
    />
  </div>
);

export default ModeSwitcher;
