import { Button, Typography } from '@mui/material'
import { NextPage } from 'next'
import { AdminLayout } from '@components/layout/AdminLayout'
import { useGetMe } from 'src/apis/users/queries'

const UserAdminPage: NextPage = () => {
  const { data: user, refetch } = useGetMe()

  if (!user) return <>You are not logged in.</>

  return (
    <AdminLayout>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        User page
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
      <div className="flex space-x-2 ">
        <div>Role:</div>
        <div className="font-semibold">{user.role}</div>
      </div>
      <div className="flex space-x-2 ">
        {/* <Link href="/admin/awards/create"> */}
        <Button
          variant="contained"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            refetch()
          }}
        >
          Refresh
        </Button>
        {/* </Link> */}
      </div>
    </AdminLayout>
  )
}

export default UserAdminPage
