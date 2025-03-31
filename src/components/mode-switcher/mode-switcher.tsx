import ModeSwitchButton from "./mode-switch-button";

const ModeSwitcher = () => {
  return (
    <div className="flex h-12 gap-2 rounded-lg bg-foreground px-2 font-mono">
      <ModeSwitchButton buttonMode="focus" colour="bg-focus-darker" />
      <ModeSwitchButton buttonMode="short break" colour="bg-short-break" />
      <ModeSwitchButton buttonMode="long break" colour="bg-long-break" />
    </div>
  );
};

export default ModeSwitcher;
