import { Checkbox } from "@/components/ui/checkbox";
import { updateLog } from "@/app/actions";
import { Habit, Log } from "./types";

const MyHabits = ({
  selectedHabits,
  date,
  logs,
}: {
  selectedHabits: Habit[];
  date: Date | undefined;
  logs: Log[];
}) => {
  const isChecked = (habitId: number) => {
    if (!logs?.length) return;
    const currentDateLogs = logs.filter(
      (log) =>
        new Date(log.date).getFullYear() === date?.getFullYear() &&
        new Date(log.date).getMonth() === date?.getMonth() &&
        new Date(log.date).getDate() === date?.getDate()
    );
    return currentDateLogs.findLast((log) => log.habit_id === habitId)?.status;
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">My habits</h2>
      {selectedHabits.map((habit) => (
        <div
          key={`${habit.id}${date}`}
          className="flex items-center space-x-2 mt-10"
        >
          <Checkbox
            id={habit.id.toString()}
            onCheckedChange={(isChecked) =>
              updateLog({ habitId: habit.id, isChecked, date })
            }
            defaultChecked={isChecked(habit.id)}
          />
          <label
            htmlFor={habit.id.toString()}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {habit.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MyHabits;
