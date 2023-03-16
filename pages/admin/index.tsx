import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { AdminLayout } from './AdminLayout'

const AdminPage: NextPage = () => {
  const { data: session } = useSession()

  return (
    <AdminLayout>
      <h2>Super-secret admin stuff for Super Users.</h2>

      <> {`I am the user ${session?.user.firstname}`}</>
    </AdminLayout>
  )
}

export default AdminPage
