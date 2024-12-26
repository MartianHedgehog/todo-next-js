import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  children: ReactNode;
  description?: string;
  placeholder?: string;
}

function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  description,
  children,
  ...props
}: FormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...props}>
          <FormLabel>{label}</FormLabel>

          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </Select>
        </FormItem>
      )}
    ></FormField>
  );
}

export default FormSelect;
