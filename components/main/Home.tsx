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
import { updateHabit, getLogs } from "@/app/actions";
import { Habit, Log } from "./types";
import MyHabits from "./MyHabits";
import HabitSelect from "./HabitSelect";

const Home = ({ habits }: { habits: Habit[] }) => {
  const [selectedHabits, setSelectedHabits] = useState<Habit[]>([]);
  useEffect(() => {
    const selectedHabits = habits?.filter((habit) => habit.selected);
    setSelectedHabits(selectedHabits);
  }, [habits]);

  const isHabitSelected = (habitId: number) =>
    !!selectedHabits.find((habit) => habit.id === habitId);

  const toggleHabitSelection = (habit: Habit) => {
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
  const [logs, setLogs] = useState<Log[] | undefined>();
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
            <Button>Edit habits</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select habit</DialogTitle>
              <DialogDescription>
                Pick a habit from the list below to add to your calendar.
              </DialogDescription>
            </DialogHeader>
            <HabitSelect
              habits={habits}
              toggleHabitSelection={toggleHabitSelection}
              isHabitSelected={isHabitSelected}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-16">
        {selectedHabits?.length > 0 && logs ? (
          <MyHabits selectedHabits={selectedHabits} date={date} logs={logs} />
        ) : (
          <div className="font-bold text-slate-600">No habits selected yet</div>
        )}
      </div>
    </div>
  );
};

export default Home;
