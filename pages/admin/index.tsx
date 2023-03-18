import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useGetMe } from 'src/apis/users/queries'
import { AdminLayout } from './AdminLayout'

const AdminPage: NextPage = () => {
  const { data: user } = useGetMe()

  if (!user) return <>You are not logged in.</>

  return (
    <AdminLayout>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Admin page
      </Typography>
      <br />
      <div className="flex space-x-2 ">
        <div>Firstname:</div>
        <div className="font-semibold">{user.firstname}</div>
      </div>
      <div className="flex space-x-2 ">
        <div>Lastname:</div>
        <div className="font-semibold">{user.lastname}</div>
      </div>
      <div className="flex space-x-2 ">
        <div>Email:</div>
        <div className="font-semibold">{user.email}</div>
      </div>
    </AdminLayout>
  )
}

export default AdminPage
