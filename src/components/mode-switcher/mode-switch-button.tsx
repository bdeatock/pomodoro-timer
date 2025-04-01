import type { TimerMode } from "../../app/app";
import { usePomodoroContext } from "@/context/pomodoro-context";

interface ModeSwitchButtonProps {
  buttonMode: TimerMode;
  colour: string;
}

const ModeSwitchButton: React.FC<ModeSwitchButtonProps> = ({
  buttonMode,
  colour,
}) => {
  const { mode, setMode } = usePomodoroContext();

  return (
    <button
      type="button"
      onClick={() => setMode(buttonMode)}
      className={`${buttonMode === mode ? colour : "bg-foreground hover:text-gray-400"} my-2 w-32 cursor-pointer rounded-lg transition-colors duration-300`}
    >
      {buttonMode}
    </button>
  );
};

export default ModeSwitchButton;
