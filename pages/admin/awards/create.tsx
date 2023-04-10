import { AwardForm } from '@components/forms/AwardForm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useUpsertAward } from 'src/apis/awards/queries'
import { AwardInput } from 'src/generated/graphql'
import { AdminLayout } from '@components/layout/AdminLayout'

const CreateQuestionPage: NextPage = () => {
  const router = useRouter()

  const { isLoading, mutate } = useUpsertAward()
  const onSubmit = (data: AwardInput) => {
    mutate(data, {
      onSuccess: (_, variables) => {
        toast.success(`${variables?.title} ${'saved'}`)
        router.back()
      }
    })
  }

  return (
    <AdminLayout>
      <AwardForm onSubmit={onSubmit} isLoading={isLoading} />
    </AdminLayout>
  )
}
export default CreateQuestionPage
