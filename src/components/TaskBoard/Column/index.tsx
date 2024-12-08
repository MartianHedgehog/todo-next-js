import { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskBoard/TaskCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BoardColumnProps,
  ColumnDragDataI,
} from "@/components/TaskBoard/Column/types";

export function BoardColumn({ column, tasks }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragDataI,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  return (
    <Card ref={setNodeRef} className="w-full">
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex justify-between flex-row items-center">
        <span> {column.title}</span>

        <Button className="h-[30px] w-[30px]" variant="ghost" size="icon">
          <Plus />
        </Button>
      </CardHeader>

      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}