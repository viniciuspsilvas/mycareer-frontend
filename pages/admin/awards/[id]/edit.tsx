import { AwardForm } from '@components/forms/AwardForm'
import { AdminListLoading } from '@components/layout/AdminListLoading'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AdminLayout } from 'pages/admin/AdminLayout'
import toast from 'react-hot-toast'
import { useGetAward, useUpdateOneAward } from 'src/apis/awards/queries'
import { Award } from 'src/generated/graphql'

const EditAwardPage: NextPage = () => {
  const router = useRouter()
  const id = router.query?.id as string

  const { data, isFetching } = useGetAward({ id })

  const { isLoading, mutate } = useUpdateOneAward()
  const onSubmit = (award: Award) => {
    mutate(award, {
      onSuccess: (_, variables) => {
        toast.success(`${variables?.title} ${'updated'}`)
        router.back()
      }
    })
  }

  return (
    <AdminLayout>
      {isFetching ? <AdminListLoading /> : <AwardForm data={data} onSubmit={onSubmit} isLoading={isLoading} />}
    </AdminLayout>
  )
}

export default EditAwardPage
