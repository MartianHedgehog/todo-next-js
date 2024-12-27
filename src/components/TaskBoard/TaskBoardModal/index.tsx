import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "@/components/FormComponents/Input";
import FormSelect from "@/components/FormComponents/Select";
import { SelectItem } from "@/components/ui/select";
import { DEFAULT_COLUMNS } from "@/components/TaskBoard/Board/constants";
import { Form } from "@/components/ui/form";
import { NewTaskSchema } from "@/components/TaskBoard/TaskBoardModal/schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { postTask } from "@/store/taskBoard/slice";
import {
  TaskBoardFormValues,
  TaskBoardModalProps,
} from "@/components/TaskBoard/TaskBoardModal/types";
import { DEFAULT_TASK } from "@/store/taskBoard/constants";
import { TASK_DEFAULT_STATUS } from "@/components/TaskBoard/TaskBoardConfig";

export function TaskBoardModal({
  status,
  toggleModal,
  isOpen,
}: TaskBoardModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof NewTaskSchema>>({
    defaultValues: {
      title: "",
      content: "",
      status: status || TASK_DEFAULT_STATUS,
    },
    mode: "onSubmit",
    resolver: zodResolver(NewTaskSchema),
  });

  const onSubmit: SubmitHandler<TaskBoardFormValues> = async (data) => {
    dispatch(postTask({ ...DEFAULT_TASK, ...data }));

    toggleModal();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={toggleModal}>
        <Button
          disabled={form.formState.isLoading || form.formState.isSubmitting}
          className="h-[30px] w-[30px]"
          variant="ghost"
          size="icon"
        >
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
        </DialogHeader>

        <Form {...form} control={form.control}>
          <form
            name="task-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormSelect label="Status" name="status" control={form.control}>
              {DEFAULT_COLUMNS.map((column) => (
                <SelectItem key={column.status} value={column.status}>
                  {column.title}
                </SelectItem>
              ))}
            </FormSelect>

            <FormInput
              label="Title"
              name="title"
              control={form.control}
              required
            />

            <FormInput
              label="Content"
              name="content"
              control={form.control}
              required
            />

            <DialogFooter>
              <Button disabled={!form.formState.isValid} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
