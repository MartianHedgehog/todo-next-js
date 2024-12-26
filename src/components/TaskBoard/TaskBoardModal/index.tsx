import { SubmitHandler, useForm } from "react-hook-form";
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
import { z } from "zod";
import { NewTaskSchema } from "@/components/TaskBoard/TaskBoardModal/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

type StatusId = (typeof DEFAULT_COLUMNS)[number]["id"];

interface FormValues {
  title: string;
  content: string;
  status: StatusId;
}

interface TaskBoardModalProps {
  status: StatusId;
}

export function TaskBoardModal({ status }: TaskBoardModalProps) {
  const form = useForm<z.infer<typeof NewTaskSchema>>({
    defaultValues: {
      title: "",
      content: "",
      status: status || "todo",
    },
    mode: "onSubmit",
    resolver: zodResolver(NewTaskSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setTimeout(async () => {
      const fakeResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });

      console.log(fakeResponse);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
                <SelectItem key={column.id} value={column.id}>
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
