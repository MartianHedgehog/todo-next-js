"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { AppDispatch, useAppSelector } from "@/store/store";
import { editTask, fetchTodoBoard, getTasks } from "@/store/taskBoard/slice";
import { BoardColumn } from "@/components/TaskBoard/Column";
import { BoardContainer } from "@/components/TaskBoard/BoardContainer";
import { TaskCard } from "@/components/TaskBoard/TaskCard";
import { hasDraggableData } from "@/utils/hasDraggableData";
import { DEFAULT_COLUMNS } from "@/components/TaskBoard/Board/constants";
import {
  BoardProps,
  COLUMN_IDS,
  ColumnId,
} from "@/components/TaskBoard/Board/types";
import { type TaskI } from "@/components/TaskBoard/TaskCard/types";

export function Board({ boardId }: BoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const tasksFromStore = useAppSelector((state) => getTasks(state));
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);

  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [activeTask, setActiveTask] = useState<TaskI | null>(null);

  // Workaround to avoid rendering the DragOverlay on the server
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof boardId === "string") {
      dispatch(fetchTodoBoard(boardId));
    }
  }, [boardId, dispatch]);

  useEffect(() => {
    setTasks(tasksFromStore);
  }, [tasksFromStore]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.status === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = DEFAULT_COLUMNS.find((col) => col.status === columnId);

    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;

      if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.status;

        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current!
        );

        return `Picked up Task ${
          active.data.current.task.content
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Task" &&
        over?.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.status
        );
        if (over.data.current.task.status !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.content
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }

      if (
        active.data.current?.type === "Task" &&
        over?.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.status
        );

        if (over.data.current.task.status !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }

      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;

      if (!hasDraggableData(active)) return;

      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;

    const data = event.active.data.current;

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    if (activeId === overId) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    if (!isActiveATask) return;

    // I'm dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];

        if (activeTask && overTask && activeTask.status !== overTask.status) {
          const updatedTask = { ...activeTask, status: overTask.status };
          const updatedTasks = [...tasks];
          updatedTasks[activeIndex] = updatedTask;

          dispatch(editTask(updatedTask));
          return arrayMove(updatedTasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // I'm dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];

        if (activeTask) {
          const updatedTask = { ...activeTask, status: overId as ColumnId };
          const updatedTasks = [...tasks];
          updatedTasks[activeIndex] = updatedTask;

          dispatch(editTask(updatedTask));
          return arrayMove(updatedTasks, activeIndex, activeIndex);
        }

        return tasks;
      });
    }
  }

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={COLUMN_IDS}>
          {DEFAULT_COLUMNS.map((col) => (
            <BoardColumn
              isOverlay
              key={col.status}
              column={col}
              tasks={tasks.filter((task) => task.status === col.status)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {isClient &&
        createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
