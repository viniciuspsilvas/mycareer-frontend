import { Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserInput } from 'src/generated/graphql'

export interface LoginFormProps {
  onSubmit: SubmitHandler<UserInput>
  isLoading?: boolean
}

export const LoginForm = ({ isLoading = false, onSubmit }: LoginFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserInput>()

  return (
    <>
      <Typography variant="h2">Login</Typography>

      <form className="flex flex-col space-y-4 md:space-y-6 w-full md:w-2/3 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 md:space-y-4">
          <TextField
            label="Email"
            {...register('email', { required: 'This field is required' })}
            error={!!errors.email}
            helperText={`${errors.email?.message || ''}`}
          />
          <TextField
            label="Password"
            {...register('password', { required: 'This field is required' })}
            error={!!errors.password}
            helperText={`${errors.password?.message || ''}`}
          />
        </div>
        <div className="flex flex-row space-x-4 justify-center">
          <Button variant="contained" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>

          <Button variant="outlined" color="secondary" type="reset" className="w-full" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </>
  )
}
