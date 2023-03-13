/**
 */

// import { ClientError } from '@lib/common/errors/errors'
// import { motion } from 'framer-motion'
import { isEmpty } from 'lodash'
import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast'

interface ErrorToasterProps {
  // error: ClientError
  error: any
  type?: 'component' | 'page'
  retry?: () => void
  showToaster?: boolean
}

export const ErrorToaster: FC<ErrorToasterProps> = ({ error, type }) => {
  return (
    <>
      <div
        className={`${
          type === 'component' ? 'h-full' : 'h-screen'
        } flex flex-col justify-center items-center w-full  bg-secondary text-red`}
      >
        <h1>{`Error: ${error.type}`}</h1>
        <h4>{`${error.message}`}</h4>
        {/* {retry && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-primary text-white p-3 rounded-md cursor-pointer"
            onClick={() => retry()}
          >
            Retry
          </motion.button>
        )} */}
      </div>
    </>
  )
}
