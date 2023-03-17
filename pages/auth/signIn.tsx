import { SignInForm } from '@components/forms/SignInForm'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useLogin } from 'src/apis/auth/queries'
import { UserInput } from 'src/generated/graphql'

const SignInPage: NextPage = () => {
  const router = useRouter()
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? '/')

  const onSubmit = async ({ email, password }: UserInput) => {
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/admin',
      redirect: true
    })
    if (result?.error) {
      console.error(result)
      toast.error(`Invalid login.${result.error}`)
    }
    if (result?.ok) {
      router.push(callbackUrl)
    }
    console.log('@@ result.status', result?.status)
  }

  return <SignInForm onSubmit={onSubmit} />
}
export default SignInPage
