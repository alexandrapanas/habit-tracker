import { Habit } from "./types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const HabitSelect = ({
  habits,
  toggleHabitSelection,
  isHabitSelected,
}: {
  habits: Habit[];
  toggleHabitSelection: (habit: Habit) => void;
  isHabitSelected: (id: number) => boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {habits?.map((habit) => (
        <Button
          key={habit.id}
          className={cn({
            "bg-green-500": isHabitSelected(habit.id),
            "bg-gray-400": !isHabitSelected(habit.id),
          })}
          onClick={() => toggleHabitSelection(habit)}
        >
          {habit.name} {isHabitSelected(habit.id) && <Check />}
        </Button>
      ))}
    </div>
  );
};

export default HabitSelect;
