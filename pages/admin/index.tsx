import { NextPage } from 'next'
import { AdminLayout } from './AdminLayout'

const AdminPage: NextPage = () => {
  return (
    <AdminLayout>
      <h2>Super-secret admin stuff for Super Users.</h2>
    </AdminLayout>
  )
}

export default AdminPage
