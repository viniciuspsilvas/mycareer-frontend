import { SignInForm } from '@components/forms/SignInForm'
import { Routes } from '@lib/common/route'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AdminLayout } from '@components/layout/AdminLayout'
import toast from 'react-hot-toast'
import { UserInput } from 'src/generated/graphql'

const SignInPage: NextPage = () => {
  const router = useRouter()
  const { message } = router.query

  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? '/')

  const onSubmit = async ({ email, password }: UserInput) => {
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: Routes.admin, // TODO: if the user.role === USER, redirect to /user page
      redirect: true
    })
    if (result?.error) {
      console.error(result)
      toast.error(`Invalid login.${result.error}`)
    }
    if (result?.ok) {
      router.push(callbackUrl)
    }
  }

  return (
    <AdminLayout>
      <>
        {message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{message}</p>}
        <SignInForm onSubmit={onSubmit} />
      </>
    </AdminLayout>
  )
}
export default SignInPage
