"use client";
import {
  ChangeEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

import { Schedule } from "@/commons/type";
import { Button } from "./button";

import { Input } from "./input";
import { Label } from "./label";
import { sendMessageToRN } from "@/commons/utils/react-native";
import {
  findReminder,
  setReminder,
  unsetReminder,
} from "@/commons/utils/local-storage";

interface ScheduleMenuProps extends PropsWithChildren {
  schedule: Schedule;
  station: { id: string; name: string };
}

const ScheduleMenu = ({ children, schedule, station }: ScheduleMenuProps) => {
  const [open, setOpen] = useState(false);
  const [isReminded, setIsreminded] = useState(false);

  useEffect(() => {
    if (schedule && !open) {
      const isLSReminded = Boolean(findReminder(schedule.id));
      setIsreminded(isLSReminded);
    }
  }, [schedule, open]);

  const [beforeMinutes, setMinutes] = useState<number | null>(15);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    const parsedNumber = value === "" ? null : Number(value);

    // Ensure the value is between 0 and 60
    if (parsedNumber === null || (parsedNumber >= 0 && parsedNumber <= 60)) {
      setMinutes(parsedNumber);
    }
  };

  const handleSetReminder = () => {
    sendMessageToRN({
      action: isReminded ? "UNSET_REMINDER" : "SET_REMINDER",
      payload: {
        station,
        schedule,
        beforeMinutes: beforeMinutes ?? 0,
      },
    });

    if (isReminded) {
      unsetReminder(schedule.id);
    } else {
      setReminder(schedule.id);
    }

    setOpen(false);
  };

  if (typeof window !== "undefined" && Boolean(!window.ReactNativeWebView))
    return children;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[500px]">
          <DrawerHeader>
            <DrawerTitle>
              {isReminded ? "Unset" : "Set"} daily reminder {isReminded && "?"}
            </DrawerTitle>
            <DrawerDescription>
              {schedule.route} at {schedule.timeEstimated} WIB
            </DrawerDescription>
          </DrawerHeader>
          {!isReminded && (
            <div className="grid w-full items-center gap-1.5 p-4">
              <Label htmlFor="minutes">Minutes before train arrival</Label>
              <Input
                min={0}
                max={60}
                type="number"
                id="minutes"
                placeholder="15"
                value={beforeMinutes ?? ""}
                onChange={handleChange}
              />
              <span className="text-xs text-muted-foreground">
                Default 15 minutes before train arrived. Maximum 60 minutes.
              </span>
            </div>
          )}
          <DrawerFooter>
            <Button
              onClick={handleSetReminder}
              variant={isReminded ? "destructive" : "default"}
            >
              {isReminded ? "Unset" : "Set"} reminder
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ScheduleMenu;
