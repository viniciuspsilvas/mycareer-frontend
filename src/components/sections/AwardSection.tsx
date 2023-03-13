import { isEmpty } from 'lodash'
import * as React from 'react'
import { useAwards } from 'src/apis/awards/queries'
import { Award } from 'src/generated/graphql'

export type AwardSectionProps = {}

const AwardSection: React.FC<AwardSectionProps> = () => {
  const { data, isFetching } = useAwards()
  return (
    <div className="flex flex-col bg-white w-auto px-32 py-24">
      <h1 className="py-10">Awards</h1>

      {isFetching ? (
        'Loading Awards...'
      ) : isEmpty(data) ? (
        'No data found'
      ) : (
        <ul>
          {data?.map((awards, index) => (
            <li key={index}>
              <AwardCard data={awards} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

type AwardCardProps = {
  data: Partial<Award>
}

const AwardCard: React.FC<AwardCardProps> = ({ data }) => {
  return (
    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
      <span className="font-semibold"> {data.title}</span>
      {data.description && ` - ${data.description}`}
    </p>
  )
}

export default AwardSection
