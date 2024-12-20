"use server";

import { supabase } from "./supabase";

export const updateHabit = async ({
  habitId,
  isSelected,
}: {
  habitId: number;
  isSelected: boolean;
}) => {
  try {
    const { error } = await supabase
      .from("habits")
      .update({ selected: isSelected })
      .eq("id", habitId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateLog = async ({
  habitId,
  isChecked,
  date,
}: {
  habitId: number;
  isChecked: boolean | string;
  date: Date | undefined;
}) => {
  if (!date) return;
  try {
    const { error } = await supabase.from("habit_logs").insert({
      habit_id: habitId,
      date: date,
      status: isChecked,
    });
    console.log({ error });
  } catch (error) {
    console.log(error);
  }
};

export const getLogs = async () => {
  try {
    const { data, error } = await supabase.from("habit_logs").select();
    console.log({ logs: data, error });
    return data;
  } catch (error) {
    console.log(error);
  }
};
