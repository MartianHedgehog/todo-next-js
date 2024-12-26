import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SelectProps } from "@radix-ui/react-select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputProps<T extends FieldValues> extends SelectProps {
  label: string;
  name: Path<T>;
  control: Control<T>;
  description?: string;
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: InputProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input {...field} {...props} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
