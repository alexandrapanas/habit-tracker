"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateHabit, updateLog, getLogs } from "@/app/actions";
import { Habit } from "./types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Home = ({ habits }: { habits: Habit[] }) => {
  const [selectedHabits, setSelectedHabits] = useState<Habit[]>([]);
  useEffect(() => {
    const selectedHabits = habits.filter((habit) => habit.selected);
    setSelectedHabits(selectedHabits);
  }, [habits]);

  const isHabitSelected = (habitId: string) =>
    selectedHabits.find((habit) => habit.id === habitId);

  const toggleHabbitSelection = (habit: Habit) => {
    const habitExists = isHabitSelected(habit.id);
    setSelectedHabits(
      habitExists
        ? selectedHabits.filter(
            (selectedHabit) => selectedHabit.id !== habit.id
          )
        : [...selectedHabits, habit]
    );
    updateHabit({ habitId: habit.id, isSelected: !habitExists });
  };

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const getLogsForDate = async () => {
      const allLogs = await getLogs();
      if (allLogs) {
        setLogs(allLogs);
      }
    };
    getLogsForDate();
  }, [date]);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add new habit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select habit</DialogTitle>
              <DialogDescription>
                Pick a habit from the list below to add to your calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {habits?.map((habit) => (
                <Button
                  key={habit.id}
                  className={cn({
                    "bg-green-500": isHabitSelected(habit.id),
                    "bg-gray-400": !isHabitSelected(habit.id),
                  })}
                  onClick={() => toggleHabbitSelection(habit)}
                >
                  {habit.name} {isHabitSelected(habit.id) && <Check />}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-16">
        {selectedHabits.length > 0 ? (
          <div>
            <h2 className="font-bold text-2xl">My habits</h2>
            {selectedHabits.map((habit) => (
              <div key={habit.id} className="flex items-center space-x-2 mt-10">
                <Checkbox
                  id={habit.id}
                  onCheckedChange={(isChecked) =>
                    updateLog({ habitId: habit.id, isChecked, date })
                  }
                />
                <label
                  htmlFor={habit.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {habit.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-bold text-slate-600">No habits selected yet</div>
        )}
      </div>
    </div>
  );
};

export default Home;
