import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as stories from '../__stories__/create.stories'

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import toast from 'react-hot-toast'
import { awards } from 'src/__mocks__/data'
import { createOneAwardMocked } from 'src/__mocks__/mockedAwards'
import { worker } from 'src/__mocks__/server'

describe('Create Award Page', () => {
  const { Primary } = composeStories(stories)

  test('should render correctly', () => {
    render(<Primary />)
  })

  test('should Create correctly', async () => {
    // Mock the success message
    jest.mock('react-hot-toast', () => {
      const toast = { success: jest.fn() }
      return toast
    })

    worker.use(createOneAwardMocked)
    render(<Primary />, { wrapper: MemoryRouterProvider })

    userEvent.type(screen.getByRole('textbox', { name: /title/i }), awards.awards[0].title)
    userEvent.type(screen.getByRole('textbox', { name: /description/i }), awards.awards[0].description)
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /submit/i }))
      expect(toast.success).toHaveBeenCalled()
    })
  })
})
