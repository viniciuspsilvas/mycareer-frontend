import { validateAccessToken } from '@lib/common/utils/authentication'
import { getAccessToken } from 'src/redux/authenticationState'
import { useAppSelector } from 'src/redux/hooks'

export const useAuthenticated = () => {
  const accessToken = useAppSelector(getAccessToken)

  return !!accessToken && validateAccessToken(accessToken)
}
