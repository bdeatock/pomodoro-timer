import { Icon } from "@iconify/react";
import MainTimer from "../components/main-timer";
import ModeSwitcher from "../components/mode-switcher";

const App = () => {
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-900 text-gray-100">
        <h1 className="absolute top-0 mt-4 text-4xl font-bold text-gray-100">
          Pomodoro Timer
        </h1>

        <ModeSwitcher />
        <p>Time until long break: 48m</p>
        <MainTimer />
        <p>Today: 2h 15m</p>
        <button type="button">
          <Icon icon="ic:round-settings" className="h-6 w-6 text-gray-300" />
        </button>
      </main>
    </>
  );
};

export default App;
