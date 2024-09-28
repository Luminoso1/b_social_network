
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export default function CustomFormField({ control, name, type, placeholder }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input
              className='py-6'
              placeholder={placeholder}
              {...field}
              type={type ?? 'text'}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
