import { HTMLAttributes } from 'react'

export interface NoDataFoundProps extends HTMLAttributes<HTMLLabelElement> {
  text?: string
}

export const NoDataFound = ({ text = 'No data found', ...rest }: NoDataFoundProps): JSX.Element => {
  return (
    <div className="w-full text-center p-4">
      <div className={'text-basic-500'}>{text}</div>
    </div>
  )
}
