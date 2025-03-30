import type { TimerMode } from "../../app";

interface ModeSwitchButtonProps {
  mode: TimerMode;
  currentMode: TimerMode;
  setMode: (mode: TimerMode) => void;
  colour: string;
}

const ModeSwitchButton: React.FC<ModeSwitchButtonProps> = ({
  mode,
  setMode,
  colour,
  currentMode,
}) => (
  <button
    type="button"
    onClick={() => setMode(mode)}
    className={`${mode === currentMode ? colour : "bg-foreground"} my-2 w-36 rounded-full px-4 py-2 transition-colors duration-300`}
  >
    {mode}
  </button>
);

export default ModeSwitchButton;
