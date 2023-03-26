import { FC } from 'react'
import { en as baseEn } from '@i18n/en'

export const Loading: FC<{}> = () => {
  const { label } = baseEn

  return (
    <div className="flex items-center justify-center space-x-2 ">
      <div className="w-4 h-4 bg-secondary rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-secondary rounded-full animate-bounce animation-delay-200"></div>
      <div className="w-4 h-4 bg-secondary rounded-full animate-bounce animation-delay-400"></div>
      {`${label.loading}...`}
    </div>
  )
}
