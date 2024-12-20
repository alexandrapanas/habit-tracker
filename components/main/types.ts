export type Habit = {
  id: number;
  name: string;
  selected: boolean;
};

export type Log = {
  id: number;
  habit_id: number;
  date: Date | string;
  status: boolean;
};
