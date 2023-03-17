/**
 */

import { FC } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopBar } from './AdminTopBar'

export interface AdminLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <AdminTopBar />
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-400 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  x-show="!open"
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path
                  x-show="open"
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <AdminSidebar />
        </div>
        <main className="flex flex-col w-full bg-white dark:bg-gray-600 ">
          <div className="flex w-full mx-auto md:p-8  ">
            <div className="flex flex-col w-full h-full">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}
