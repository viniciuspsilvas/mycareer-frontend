import { composeStories } from '@storybook/testing-react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import { awardsEmptyMocked, awardsLoadingMocked } from 'src/__mocks__/mockedAwards'
import { worker } from 'src/__mocks__/server'
import * as stories from '../__stories__/index.stories'

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { awards } from 'src/__mocks__/data'

describe('Admin Awards page', () => {
  const { Primary, Loading, Empty } = composeStories(stories)

  test('renders Admin Awards page', async () => {
    // check if all components are rendered
    render(<Primary />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Admin Awards/i })).toBeInTheDocument()
    })
  })

  test('renders Admin Awards page when it`s loading', async () => {
    worker.use(awardsLoadingMocked)
    render(<Loading />)

    await waitFor(() => {
      expect(screen.getByText(/loading/i))
    })
  })

  test('renders Admin Awards page with data', async () => {
    render(<Primary />)

    await waitFor(() => {
      // Awards table
      expect(screen.getByLabelText('Awards table')).toBeInTheDocument()
    })
  })

  test('renders Admin Awards page with No data found', async () => {
    worker.use(awardsEmptyMocked)
    render(<Empty />)

    await waitFor(() => {
      expect(screen.getByText(/no data found/i))
    })
  })

  test('Add Award button click', async () => {
    render(<Primary />, { wrapper: MemoryRouterProvider })

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button', { name: /add award/i }))
      expect(mockRouter.asPath).toEqual('/admin/awards/create')
    })
  })

  test('Edit Award button click', async () => {
    render(<Primary />, { wrapper: MemoryRouterProvider })
    const { id, title } = awards.awards[0]

    await waitFor(async () => {
      const editButton = screen.getByRole('button', { name: new RegExp('edit ' + title, 'i') })
      userEvent.click(editButton)

      expect(mockRouter.asPath).toEqual(`/admin/awards/${id}/edit`)
    })
  })

  test('Remove Award button click', async () => {})
})
