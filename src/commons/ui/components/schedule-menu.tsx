import { ChangeEventHandler, PropsWithChildren, useState } from "react";

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

interface ScheduleMenuProps extends PropsWithChildren {
  schedule: Schedule;
  station: { id: string; name: string };
  isEdit?: boolean;
}

const ScheduleMenu = ({
  children,
  schedule,
  station,
  isEdit = false,
}: ScheduleMenuProps) => {
  console.log({ schedule, station, isEdit });

  const [minutes, setMinutes] = useState<number | null>(15);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setMinutes(value === "" ? null : Number(value));
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[500px]">
          <DrawerHeader>
            <DrawerTitle>Set daily reminder</DrawerTitle>
          </DrawerHeader>
          <div className="grid w-full items-center gap-1.5 p-4">
            <Label htmlFor="minutes">Minutes before train arrival</Label>
            <Input
              min={0}
              max={60}
              type="number"
              id="minutes"
              placeholder="15"
              value={minutes !== null ? minutes : ""}
              onChange={handleChange}
            />
            <span className="text-xs text-muted-foreground">
              Default 15 minutes before train arrived.
            </span>
          </div>
          <DrawerFooter>
            <Button>Set reminder</Button>
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
