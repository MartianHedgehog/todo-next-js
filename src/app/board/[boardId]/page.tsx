import { Board } from "@/components/TaskBoard/Board";
import { useRouter } from "next/router";

export default function BoardPage() {
  const router = useRouter();
  const { boardId } = router.query;

  return <Board boardId={boardId} />;
}
