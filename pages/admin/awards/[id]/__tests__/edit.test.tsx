import { composeStories } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { awards } from 'src/__mocks__/data'
import { awardQueryMocked } from 'src/__mocks__/mockedAwards'
import { worker } from 'src/__mocks__/server'
import * as stories from '../__stories__/edit.stories'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

describe('EditAwardPage', () => {
  const { Primary } = composeStories(stories)

  test('should render correctly while receiving the award ID', async () => {
    const { id, title } = awards.awards[0]

    mockRouter.push(`/admin/awards/${id}/edit`, { query: { id } })
    worker.use(awardQueryMocked)

    render(<Primary />, { wrapper: MemoryRouterProvider })
    await waitFor(async () => {
      expect(screen.getByRole('textbox', { name: /title/i })).toHaveValue(title)
    })
  })

  test('should redirect to 404 error page if the Award Id does not exist', () => {})
  test('should redirect to 404 error page if the Award Id is null', () => {})
  test('should Loading when is fetching', () => {})
})
