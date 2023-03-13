import { LoginForm } from '@components/forms/LoginForm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useLogin } from 'src/apis/auth/queries'
import { UserInput } from 'src/generated/graphql'

const CreateQuestionPage: NextPage = () => {
  const router = useRouter()

  const { isLoading, mutate } = useLogin()
  const onSubmit = (data: UserInput) => {
    mutate(data, {
      onSuccess: (_, variables) => {
        toast.success(`Logged!`)
        // router.back()
      },
      onError: (error: any) => toast.error(`Invalid login.`)
    })
  }

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
}
export default CreateQuestionPage
