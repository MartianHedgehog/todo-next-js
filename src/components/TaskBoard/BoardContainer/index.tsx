import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function BoardContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea>
      <div className="flex gap-4 flex-row w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
        {children}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
