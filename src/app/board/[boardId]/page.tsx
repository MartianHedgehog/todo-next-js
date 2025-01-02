"use client";
import { Board } from "@/components/TaskBoard/Board";
import { usePathname } from "next/navigation";

export default function BoardPage() {
  const pathname = usePathname();
  const boardId = pathname.split("/").pop();

  return <Board boardId={boardId} />;
}
