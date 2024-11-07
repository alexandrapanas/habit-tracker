import Home from "@/components/main/Home";
import { supabase } from "@/app/supabase";

export default async function Page() {
  const { data } = await supabase.from("habits").select();
  return (
    <div className="grid  grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-[600px]">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <Home habits={data} />
      </main>
    </div>
  );
}
