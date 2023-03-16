import Router from 'next/router'
import { Url } from 'url'
import { AuthRoles } from './utils/authorization'

export enum Routes {
  admin = '/admin',
  auth = '/auth',
  awards = '/admin/awards',
  adminAwardsCreate = '/admin/awards/create',
  adminAwardsEdit = '/admin/awards/[id]/edit',
  login = '/login'
}

export interface IRouteSetting {
  authenticationRequired: boolean
  // TODO: remove it cause the user has no role yet
  // permittedRoles?: Array<AuthRoles> | undefined
}

type IRouteSettings = {
  [k in Routes]?: IRouteSetting
}

// routeSettings control who can visit a page.
// Super user `global.owner` implicitly has access to view all pages
// and therefore we don't have to put that role in routeSettings.permittedRoles
export const routeSettings: IRouteSettings = {
  [Routes.admin]: {
    authenticationRequired: true
    // permittedRoles: [AuthRoles.globalAdmin]
  },
  [Routes.awards]: {
    authenticationRequired: true
    // permittedRoles: [AuthRoles.globalAdmin]
  }
  // [Routes.admin]: {
  //   authenticationRequired: true,
  //   permittedRoles: [AuthRoles.globalUser]
  // }
}

export const getRouteSettings = (pathname: string) => {
  const exactMatchedPath = routeSettings[pathname as Routes]

  if (exactMatchedPath) return exactMatchedPath

  const parentPathname = Object.keys(routeSettings).find((route) => pathname.includes(route))
  return parentPathname ? routeSettings[parentPathname as Routes] : undefined
}

export const getCurrentPathname = () => {
  return Router.pathname
}

export const redirectToRoute = (pathname: string, query?: Url['query'], replace = false) => {
  const url: Partial<Url> = query ? { pathname, query } : { pathname }
  if (replace) {
    return Router.replace(url)
  }
  return Router.push(url)
}

export const getRouteQueryParams = () => {
  if (typeof window !== 'undefined' && !!Router) {
    return Router?.query
  }
  return {}
}
