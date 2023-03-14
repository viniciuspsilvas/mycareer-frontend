import { LoginForm } from '@components/forms/LoginForm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useLogin } from 'src/apis/auth/queries'
import { UserInput } from 'src/generated/graphql'
import { authenticate } from 'src/redux/authenticationState'
import { useAppDispatch } from 'src/redux/hooks'

const CreateQuestionPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isLoading, mutate } = useLogin()

  const onSubmit = (data: UserInput) => {
    mutate(data, {
      onSuccess: (data, variables) => {
        toast.success(`Logged!`)

        dispatch(authenticate(data))

        router.push('/admin')
      },
      onError: (error: any) => toast.error(`Invalid login.`)
    })
  }

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
}
export default CreateQuestionPage
