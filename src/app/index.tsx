import { Icon } from "@iconify/react";
import Timer from "../components/timer";

const App = () => {
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-900 text-gray-100">
        <h1 className="absolute top-0 mt-4 text-4xl font-bold text-gray-100">
          Pomodoro Timer
        </h1>

        <Timer />

        <button type="button">
          <Icon icon="ic:round-settings" className="h-6 w-6 text-gray-300" />
        </button>
      </main>
    </>
  );
};

export default App;
