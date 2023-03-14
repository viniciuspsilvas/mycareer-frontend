import { NextPage } from 'next'
import { getUser } from 'src/redux/authenticationState'
import { useAppSelector } from 'src/redux/hooks'
import { AdminLayout } from './AdminLayout'

const AdminPage: NextPage = () => {
  const user = useAppSelector(getUser)

  return (
    <AdminLayout>
      <h2>Super-secret admin stuff for Super Users.</h2>

      <> {`I am the user ${user?.firstname}`}</>
    </AdminLayout>
  )
}

export default AdminPage
