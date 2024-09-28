import CustomForm from '@/components/form/CustomForm'
import CustomFormField from '@/components/form/CustomFormField'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Edit2 } from 'lucide-react'

export const EditProfile = ({ form, onSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger
        className='bg-black text-white/85 px-4 py-2 rounded-sm mb-4'
        asChild
      >
        <Button className='absolute top-4 right-2 size-10 grid place-content-center rounded-full bg-blue-200 hover:bg-red-200 transition ease-linear'>
          <Edit2 size='24' />

          <span className='sr-only'>Edit profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <CustomForm methods={form} onSubmit={onSubmit}>
          <CustomFormField
            control={form.control}
            name='name'
            type='text'
            placeholder='Name'
          />
          <CustomFormField
            control={form.control}
            name='lastName'
            type='text'
            placeholder='Last name'
          />
          <CustomFormField
            control={form.control}
            name='nick'
            type='text'
            placeholder='Nick'
          />
          <CustomFormField
            control={form.control}
            name='email'
            type='text'
            placeholder='Email'
          />
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Biografia</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Tell us a little about the feed'
                    className='resize-none min-h-40 max-h-64 h-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='py-6 w-full font-semibold relative'>
            Submit
          </Button>
        </CustomForm>
      </DialogContent>
    </Dialog>
  )
}
