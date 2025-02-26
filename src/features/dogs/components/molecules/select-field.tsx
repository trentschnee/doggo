import { FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Control, FieldValues, Path } from "react-hook-form"

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  control: Control<T>
  options: ReadonlyArray<SelectOption>
  placeholder?: string
  disabled?: boolean
  scrollable?: boolean
}

export const SelectField = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder = "Select...",
  disabled = false,
  scrollable = false,
}: SelectFieldProps<T>) => {
  const selectContent = (options.map((option) => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  ))
  )

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {scrollable ? (
                <ScrollArea className="h-72">{selectContent}</ScrollArea>
              ) : (
                selectContent
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}