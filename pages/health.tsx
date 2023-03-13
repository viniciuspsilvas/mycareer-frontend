import type { NextPage } from 'next'
import { useHealth } from 'src/apis/health/queries'

const Health: NextPage = () => {
  const { status, data, error, isFetching } = useHealth()

  return (
    <div>
      <h1>Health Check</h1>
      <div>
        {isFetching ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <p>Database time:</p>
              <p>{data && data.health}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Health
