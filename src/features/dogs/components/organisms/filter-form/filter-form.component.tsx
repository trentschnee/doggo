import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchFormValues, searchFormSchema } from "../../../../schemas/search-form.schema";
import { SearchFilters } from "../../../types";
import { SelectField } from "../../molecules/select-field";
interface FilterFormProps {
  isLoading: boolean;
  breeds: string[];
  onSubmit: (f: SearchFilters) => void
}
const getAgeRangeFromValue = (value: string): { min?: number; max?: number } | undefined => {
  const ranges: Record<string, { min?: number; max?: number } | undefined> = {
    'any': undefined,
    '0-1': { max: 1 },
    '1-3': { min: 1, max: 3 },
    '3-7': { min: 3, max: 7 },
    '7+': { min: 7 }
  };

  return ranges[value];
};
export const FilterForm: React.FC<FilterFormProps> = ({ breeds, isLoading, onSubmit }) => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      breed: "any",        // Changed from empty string
      ageRange: "any",     // Changed from empty string
      sortBy: "breed",
      sortOrder: "asc"     // Added missing default
    },
  })
  const breedOptions = [{ value: "any", label: "Any" },
  ...breeds.map(breed => ({
    value: breed,
    label: breed
  }))];

  const handleSubmit = (values: SearchFormValues) => {
    const newFilters: SearchFilters = {
      breeds: values.breed === "any" ? [] : [values.breed],
      age: getAgeRangeFromValue(values.ageRange),
      sortBy: values.sortBy,
      sortOrder: values.sortOrder,
      pageSize: 25
    };

    onSubmit(newFilters)
  };
  return (<Form {...form} >
    <form onChange={form.handleSubmit(handleSubmit)} className="space-y-6" >


      <SelectField control={form.control}
        name="breed"
        label="Breed"
        options={breedOptions}
        placeholder="Select breed"
        disabled={isLoading}
        scrollable />
      <SelectField control={form.control}
        name="ageRange"
        label="Age"
        options={
          [
            { value: "any", label: "Any" },
            { value: "0-1", label: "Puppy (0-1 year)" },
            { value: "1-3", label: "Young (1-3 years)" },
            { value: "3-7", label: "Adult (3-7 years)" },
            { value: "7+", label: "Senior (7+ years)" }
          ]}
        placeholder="Select age range"
        disabled={isLoading}
      />
      <SelectField control={form.control}
        name="sortBy"
        label="Sort By"
        options={
          [
            { value: "breed", label: "Breed" },
            { value: "age", label: "Age" },
            { value: "name", label: "Name" }

          ]}
        placeholder="Select sort field"
        disabled={isLoading}
      />

      <SelectField control={form.control}
        name="sortOrder"
        label="Sort Order"
        options={
          [
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" }
          ]}
        placeholder="Select sort field"
        disabled={isLoading}
      />




    </form>
  </Form>)
}