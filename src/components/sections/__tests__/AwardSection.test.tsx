import { composeStories } from '@storybook/testing-react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'

import { awards } from 'src/__mocks__/data'
import { awardsEmptyMocked, awardsLoadingMocked } from 'src/__mocks__/mockedAwards'
import { worker } from 'src/__mocks__/server'
import * as stories from '../__stories__/AwardSection.stories'

describe('InboxScreen', () => {
  const { Primary, Loading, Empty } = composeStories(stories)

  test('renders AwardSection', async () => {
    const container = render(<Primary />)
    expect(screen.getByRole('heading', { name: /awards/i })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  test('renders AwardSection when it`s loading', async () => {
    worker.use(awardsLoadingMocked)
    render(<Loading />)
    expect(screen.getByText(/loading/i))
  })

  test('renders AwardSection with data', async () => {
    render(<Primary />)

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(awards.awards.length)
    })
  })

  test('renders AwardSection with No data found', async () => {
    worker.use(awardsEmptyMocked)
    render(<Empty />)

    await waitFor(() => {
      expect(screen.getByText(/no data found/i))
    })
  })
})
