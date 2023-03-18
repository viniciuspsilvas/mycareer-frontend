import { renderHook, waitFor } from '@testing-library/react'

import { awards } from 'src/__mocks__/data'
import { wrapper } from 'src/__mocks__/decorators'
import { awardQueryMocked } from 'src/__mocks__/mockedAwards'
import { worker } from 'src/__mocks__/server'
import { useAwards, useAwardById } from './queries'

describe('query useAwards hook', () => {
  test('successful useAwards query hook', async () => {
    const { result } = renderHook(() => useAwards(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(awards.awards.length)
  })
  test('successful useGetAward query hook', async () => {
    worker.use(awardQueryMocked)
    const award = awards.awards[0]

    const { result } = renderHook(() => useAwardById({ id: award.id }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.id).toBe(award.id)
  })
})
