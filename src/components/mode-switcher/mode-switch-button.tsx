import type { TimerMode } from "../../app";

const ModeSwitchButton = ({
  mode,
  setMode,
  colour,
  currentMode,
}: {
  mode: TimerMode;
  currentMode: TimerMode;
  setMode: (mode: TimerMode) => void;
  colour: string;
}) => {
  return (
    <button
      type="button"
      onClick={() => setMode(mode)}
      className={`${mode === currentMode ? colour : "bg-foreground"} rounded-full px-4 py-2 transition-colors duration-300`}
    >
      {mode}
    </button>
  );
};

export default ModeSwitchButton;
