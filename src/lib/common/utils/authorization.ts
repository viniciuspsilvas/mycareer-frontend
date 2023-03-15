import { intersection } from 'lodash-es'
import { IRouteSetting } from '../route'

export enum AuthRoles {
  globalSuper = 'global.super', // super user of the entire platform
  globalAdmin = 'global.admin',
  globalUser = 'global.user'
}

export const isSuperUser = (userRoles: AuthRoles[] = []) => userRoles.includes(AuthRoles.globalSuper)

export const findIntersectingRoles = (rolesA: AuthRoles[] = [], rolesB: AuthRoles[] = []) =>
  intersection(rolesA, rolesB)

export const hasIntersectingRoles = (rolesA: AuthRoles[] = [], rolesB: AuthRoles[] = []) =>
  findIntersectingRoles(rolesA, rolesB).length > 0

export const isAuthorizedToViewPage = (route: IRouteSetting, userRoles: AuthRoles[] = []) => {
  return isSuperUser(userRoles) || findIntersectingRoles(route.permittedRoles, userRoles).length > 0
}
