import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export function SelectDate({ values, label, name }: { values: string[]; label: string; name: string }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize text-sm font-normal">
            {label} <span className="text-red-500"> *</span>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select a ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((value: string) => {
                return (
                  <SelectItem key={value} value={value} className="text-xs font-light cursor-pointer">
                    {value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs font-light" />
        </FormItem>
      )}
    />
  );
}
