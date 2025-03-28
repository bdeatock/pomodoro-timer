import type { TimerMode } from "../timer";
import ModeSwitchButton from "./mode-switch-button";

const ModeSwitcher = ({
  mode,
  setMode,
}: {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}) => {
  return (
    <div className="flex gap-2 rounded-full bg-gray-800">
      <ModeSwitchButton
        mode="focus"
        setMode={setMode}
        colour="bg-yellow-600"
        currentMode={mode}
      />
      <ModeSwitchButton
        mode="short break"
        setMode={setMode}
        colour="bg-teal-600"
        currentMode={mode}
      />
      <ModeSwitchButton
        mode="long break"
        setMode={setMode}
        colour="bg-purple-600"
        currentMode={mode}
      />
    </div>
  );
};

export default ModeSwitcher;
