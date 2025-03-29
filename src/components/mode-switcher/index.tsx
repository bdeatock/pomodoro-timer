import type { TimerMode } from "../../app";
import ModeSwitchButton from "./mode-switch-button";

const ModeSwitcher = ({
  mode,
  setMode,
}: {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}) => {
  return (
    <div className="flex gap-2 rounded-full bg-foreground">
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
};

export default ModeSwitcher;
