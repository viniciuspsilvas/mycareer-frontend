import { composeStories } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import { wrapper } from 'src/__mocks__/decorators'
import * as stories from '../__stories__/index.stories'

describe('AdminPage', () => {
  const { Primary } = composeStories(stories)

  test.only('renders AdminPage page', async () => {
    render(<Primary />, { wrapper })

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Admin page/i })).toBeInTheDocument()
    })
  })
})
