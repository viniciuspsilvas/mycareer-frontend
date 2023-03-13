import { renderHook, waitFor } from '@testing-library/react'

import { graphql } from 'msw'
import { wrapper } from 'src/__mocks__/decorators'
import { worker } from 'src/__mocks__/server'
import { useHealth } from './queries'

describe('query useHealth hook', () => {
  test('successful useHealth query hook', async () => {
    const now = Date.now().toString()
    worker.use(graphql.query('Health', (_, res, ctx) => res(ctx.data({ health: now }))))

    const { result } = renderHook(() => useHealth(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBe(now)
  })
})
