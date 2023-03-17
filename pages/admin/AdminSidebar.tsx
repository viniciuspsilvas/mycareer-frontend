/**
 */

import { Routes } from '@lib/common/route'
import Link from 'next/link'
import { FC } from 'react'
import { UrlObject } from 'url'

export interface AdminSidebarProps {
  children?: JSX.Element | JSX.Element[]
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ children }) => {
  return (
    <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
      <MenuItem href={Routes.admin} name="Home" />
      <MenuItem href={Routes.adminAwards} name="Awards" />
      {/* <MenuItem href="/admin/certifications" name="Certifications" />
      <MenuItem href="/admin/details" name="Details" />
      <MenuItem href="/admin/educations" name="Educations" /> */}
    </nav>
  )
}

interface MenuItemProps {
  href: string | UrlObject
  name: string
  isSelected?: boolean
  className?: string
  onClickHandler?: () => void
}

export const MenuItem: FC<MenuItemProps> = ({ name, href, className, isSelected = false, onClickHandler }) => (
  <Link href={href}>
    <a
      id={`${name}_nav_link`}
      onClick={onClickHandler}
      className={`block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${className}
       ${isSelected && 'text-primary bg-gray-200 '}`}
    >
      {name}
    </a>
  </Link>
)
