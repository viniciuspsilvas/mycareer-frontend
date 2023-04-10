import mockAuthStates from '.storybook/previewMockAuthStates'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import { withMockAuth } from 'src/__mocks__/withMockAuth'
import * as stories from '../__stories__/AdminLayout.stories'

describe('AdminLayout', () => {
  const { Primary } = composeStories(stories)

  test('should render correctly', () => {
    render(withMockAuth(<Primary />, mockAuthStates.admin.session))

    expect(screen.getByText(/My Career/i)).toBeInTheDocument()
  })
})
