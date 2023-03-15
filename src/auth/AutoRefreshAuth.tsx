import { useRestrictedRouteCheck } from '@hooks/useRestrictedRouteCheck'
import { getCurrentPathname, redirectToRoute, Routes } from '@lib/common/route'
import { isValidAccessToken } from '@lib/common/utils/authentication'
import { getEnv } from '@lib/Environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { isEmpty } from 'lodash'
import Error from 'next/error'
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
    // TODO For some reason the mutation is not been involked
    console.log(
      '### accessToken || !isValidAccessToken',
      accessToken,
      isValidAccessToken(),
      !accessToken || !isValidAccessToken()
    )

    // TODO For some reason the mutation is not been involked

    if (!accessToken || !isValidAccessToken()) mutate()
    // else setIsLoading(false)
  }, [accessToken, mutate])

  const { status, reason } = useRestrictedRouteCheck()

  if (isLoading) return <AutoRefreshLoading />

  if (status === 401) redirectToRoute(Routes.login, { callbackUrl: getCurrentPathname() }, true)

  return (
    <div>
      {status && status !== 401 ? (
        <div className="w-full">
          <Error statusCode={status} title={reason} />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}
