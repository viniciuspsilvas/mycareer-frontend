import { Button, TextField, Typography } from '@mui/material'
import router from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Award, AwardInput } from 'src/generated/graphql'

export interface AwardFormProps {
  data?: Award
  onSubmit: SubmitHandler<AwardInput>
  isLoading?: boolean
}

export const AwardForm = ({ data, isLoading = false, onSubmit }: AwardFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AwardInput>({
    defaultValues: {
      id: data?.id,
      description: data?.description,
      title: data?.title,
      grantedAt: data?.grantedAt || new Date()
    }
  })

  const goBack = () => router.back()

  return (
    <>
      <Button variant="text" onClick={goBack}>
        Back
      </Button>
      <Typography variant="h2">Award</Typography>

      <form className="flex flex-col space-y-4 md:space-y-6 w-full md:w-2/3 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 md:space-y-4">
          <TextField
            label="Title"
            {...register('title', { required: 'This field is required' })}
            error={!!errors.title}
            helperText={`${errors.title?.message || ''}`}
          />
          <TextField
            label="Description"
            {...register('description', { required: 'This field is required' })}
            error={!!errors.description}
            helperText={`${errors.description?.message || ''}`}
          />
          <TextField
            label="Granted At"
            {...register('grantedAt', { required: 'This field is required' })}
            error={!!errors.grantedAt}
            helperText={`${errors.grantedAt?.message || ''}`}
          />
        </div>
        <div className="flex flex-row space-x-4 justify-center">
          <Button variant="contained" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>

          <Button variant="outlined" color="secondary" type="reset" className="w-full" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </>
  )
}
