import { Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UserInput } from 'src/generated/graphql'

export interface SignInFormProps {
  onSubmit: SubmitHandler<UserInput>
  isLoading?: boolean
}

export const SignInForm = ({ isLoading = false, onSubmit }: SignInFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserInput>()

  return (
    <div className="w-full flex justify-center">
      <div className="self-center  flex flex-col mt-10 sm:mt-20 justify-center w-2/3 md::w-1/3 max-w-md border-2 p-10 rounded-2xl bg-gray-50 shadow-lg">
        <Typography variant="h4" className="text-center text-gray-500">
          Sign In
        </Typography>

        <form className="flex flex-col space-y-4 md:space-y-6 mt-10 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4 md:space-y-6">
            <TextField
              label="Email"
              {...register('email', { required: 'This field is required' })}
              error={!!errors.email}
              helperText={`${errors.email?.message || ''}`}
            />
            <TextField
              type="password"
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
      </div>
    </div>
  )
}
