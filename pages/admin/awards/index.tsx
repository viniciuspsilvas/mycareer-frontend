import { ErrorToaster } from '@components/global/ErrorToaster'
import { NoDataFound } from '@components/global/NoDataFound'
import { AdminListLoading } from '@components/layout/AdminListLoading'
import { Delete, Edit } from '@mui/icons-material'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { isEmpty } from 'lodash'
import { NextPage } from 'next'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAwards, useDeleteAward } from 'src/apis/awards/queries'
import { Award } from 'src/generated/graphql'
import { AdminLayout } from '../AdminLayout'
import { en } from './i18n/en'
import { en as baseEn } from '@i18n/en'

const AwardsPage: NextPage = () => {
  const { data, error: awardsError, isFetching: isFetchingAwards } = useAwards()

  const { actions, label } = baseEn
  const { title } = en

  const { isLoading: isLoadingAward, mutate, error: deleteAwardError } = useDeleteAward()
  const handleDelete = (award: Award) => {
    mutate(
      { id: award.id },
      {
        onSuccess: (_) => {
          toast.success(`${award?.title} ${'deleted'}`)
        }
      }
    )
  }

  const error = awardsError || deleteAwardError
  const isLoading = isLoadingAward || isFetchingAwards

  if (isLoading) return <AdminListLoading />
  if (error) return <ErrorToaster error={error} />

  return (
    <AdminLayout>
      <section className="space-y-4">
        <Typography variant="h2">{title}</Typography>

        <Link href="/admin/awards/create">
          <Button variant="contained" type="button">
            {actions.create}
          </Button>
        </Link>

        {isEmpty(data) ? (
          <NoDataFound />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Awards table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-gray-300 font-semibold">{label.title}</TableCell>
                  <TableCell className="bg-gray-300 font-semibold">{label.description}</TableCell>
                  <TableCell colSpan={2} className="bg-gray-300 font-semibold"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((award) => (
                  <TableRow key={award.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {award.title}
                    </TableCell>
                    <TableCell>{award.description}</TableCell>
                    <TableCell>
                      <Link href={`/admin/awards/${award.id}/edit`}>
                        <IconButton aria-label={`Edit ${award.title}`}>
                          <Edit />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => handleDelete(award)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </AdminLayout>
  )
}

export default AwardsPage
