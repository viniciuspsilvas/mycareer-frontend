import { AwardForm } from '@components/forms/AwardForm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useCreateOneAward } from 'src/apis/awards/queries'
import { Award } from 'src/generated/graphql'
import { AdminLayout } from '../AdminLayout'

const CreateQuestionPage: NextPage = () => {
  const router = useRouter()

  const { isLoading, mutate } = useCreateOneAward()
  const onSubmit = (data: Award) => {
    data.grantedAt = new Date()

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
