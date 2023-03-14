import { isValidAccessToken } from '@lib/common/utils/authentication'
import { getEnv } from '@lib/Environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { LoginResponse } from 'src/generated/graphql'
import { authenticate, getAccessToken } from 'src/redux/authenticationState'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

const endpoint: string = getEnv().NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const AutoRefreshLoading = () => {
  return <div className="w-screen h-screen ">Some Header Loading...</div>
}

export const AutoRefreshAuth: FC<{ children?: React.ReactNode }> = ({ children = <></> }) => {
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = useAppSelector(getAccessToken)
  const dispatch = useAppDispatch()

  const postRefreshToken = async () => await api.post<LoginResponse>('/refresh_token')

  const { mutate } = useMutation(postRefreshToken, {
    onSuccess: ({ data }) => {
      if (!isEmpty(data?.accessToken)) dispatch(authenticate(data))
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  useEffect(() => {
    if (!accessToken || !isValidAccessToken()) mutate()
  }, [accessToken, mutate])

  if (isLoading) return <AutoRefreshLoading />

  return (
    <div>
      AppLayout
      {children}
    </div>
  )
}
