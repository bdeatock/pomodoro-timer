import { Icon } from "@iconify/react/dist/iconify.js";
import { TimerMode } from "../../app";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
interface SettingsProps {
  modeDurations: Record<TimerMode, number>;
  setModeDurations: (modeDurations: Record<TimerMode, number>) => void;
}

const Settings = ({ modeDurations, setModeDurations }: SettingsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon">
          <Icon icon="ic:round-settings" className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b border-gray-300 p-6">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 px-6 pb-12">
          {Object.entries(modeDurations).map(([mode, duration]) => (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label
                htmlFor={`${mode}-duration`}
                className="text-muted-foreground text-sm"
              >
                {mode}
              </label>
              <Input
                id={`${mode}-duration`}
                type="number"
                value={duration}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  const clampedValue = Math.min(Math.max(value, 1), 99);
                  setModeDurations({ ...modeDurations, [mode]: clampedValue });
                }}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="default" size="lg">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
