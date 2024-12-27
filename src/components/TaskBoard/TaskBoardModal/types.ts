import { DEFAULT_COLUMNS } from "@/components/TaskBoard/Board/constants";

type StatusId = (typeof DEFAULT_COLUMNS)[number]["status"];

export interface TaskBoardFormValues {
  title: string;
  content: string;
  status: StatusId;
}

export interface TaskBoardModalProps {
  status: StatusId;
  isOpen: boolean;
  toggleModal: () => void;
}
