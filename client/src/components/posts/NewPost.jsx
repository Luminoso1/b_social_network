import CustomForm from '../form/CustomForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

export default function NewPost({ form, onSubmit }) {
  const fileRef = form.register('file')

  return (
    <Dialog>
      <DialogTrigger className='bg-black text-white/85 px-4 py-2 rounded-sm mb-4 '>
        New Post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <CustomForm methods={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>File</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    className='py-6'
                    placeholder='adasdas'
                    {...fileRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Text</FormLabel>
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
