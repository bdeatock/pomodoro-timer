import CentreTimer from "@/components/centre-timer/centre-timer";
import DailyTracker from "@/components/daily-tracker";
import FocusUntilBreak from "@/components/focus-until-break";
import NotificationPermission from "@/components/notification-permission";
import { PomodoroProvider } from "@/context/pomodoro-context";
import ModeSwitcher from "../components/mode-switcher/mode-switcher";
import Settings from "../components/settings/settings";

export type TimerMode = "focus" | "short break" | "long break";

const App = () => {
  return (
    <PomodoroProvider>
      <NotificationPermission />
      <div className="w-screen bg-background text-primary">
        <div className="container mx-auto flex h-screen flex-col">
          <header className="flex justify-center">
            <h1 className="mt-6 font-audiowide text-4xl font-normal tracking-wider text-gray-200 select-none">
              pomodoro
            </h1>
          </header>
          <main className="mt-14 flex flex-1 flex-col items-center">
            <ModeSwitcher />
            <FocusUntilBreak />
            <div className="flex flex-1 flex-col items-center justify-around">
              <div />
              <CentreTimer />

              <DailyTracker />
              <div className="mb-12">
                <Settings />
              </div>
            </div>
          </main>
        </div>
      </div>
    </PomodoroProvider>
  );
};

export default App;
