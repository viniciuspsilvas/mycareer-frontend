import { render, screen, waitFor } from '@testing-library/react'
import { graphql } from 'msw'
import { wrapper } from 'src/__mocks__/decorators'
import { worker } from 'src/__mocks__/server'
import Health from '../health'

describe('Health', () => {
  test('renders Health when it`s loading', async () => {
    worker.use(graphql.query('Health', (_, res, ctx) => res(ctx.delay('infinite'))))

    render(<Health />, { wrapper })
    expect(screen.getByText(/loading/i))
  })

  test('renders Health with data', async () => {
    worker.use(graphql.query('Health', (_, res, ctx) => res(ctx.data({ health: Date.now() }))))
    render(<Health />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText(/Database time/i))
    })
  })

  test('renders Health with Error', async () => {
    worker.use(
      graphql.query('Health', (_, res, ctx) =>
        res(
          ctx.errors([
            {
              message: 'Health check failed.'
            }
          ])
        )
      )
    )
    render(<Health />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText(/Error/i))
    })
  })
})
