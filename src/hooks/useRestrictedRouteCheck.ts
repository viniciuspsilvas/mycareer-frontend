import { getRouteSettings } from '@lib/common/route'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthenticated } from './useAuthenticated'

type useRestrictedRouteCheckReturnType = {
  status: 401 | 403 | 404 | undefined
  reason?: string
}

export const useRestrictedRouteCheck = (): useRestrictedRouteCheckReturnType => {
  const router = useRouter()
  const isAuthenticated = useAuthenticated()
  const { pathname } = router

  const [restrictedRouteCheck, setRestrictedRouteCheck] = useState<useRestrictedRouteCheckReturnType>({
    status: undefined,
    reason: ''
  })

  useEffect(() => {
    const routeSetting = getRouteSettings(pathname)
    let status: useRestrictedRouteCheckReturnType['status'] = undefined
    let reason = ''

    if (routeSetting) {
      const { authenticationRequired } = routeSetting
      if (authenticationRequired && !isAuthenticated) {
        status = 401
        reason = 'Not Authenticated'
      } else if (authenticationRequired) {
        status = 403
        reason = 'Not Authorized'
      }
    }
    setRestrictedRouteCheck({ status, reason })
  }, [pathname, isAuthenticated])
  return restrictedRouteCheck
}
