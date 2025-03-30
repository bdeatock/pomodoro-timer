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
    className={`${mode === currentMode ? colour : "bg-foreground hover:text-gray-400"} my-2 w-32 rounded-lg transition-colors duration-300`}
  >
    {mode}
  </button>
);

export default ModeSwitchButton;
