import { FormProvider } from 'react-hook-form'

export default function CustomForm({ methods, onSubmit, children }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='space-y-5'>
        {children}
      </form>
    </FormProvider>
  )
}
