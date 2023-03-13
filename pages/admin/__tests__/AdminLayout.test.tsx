import { render, screen } from '@testing-library/react'
import AwardsPage from '../index'

describe('AdminLayout', () => {
  test('renders unchanged', () => {
    const { container } = render(<AwardsPage />)
    expect(container).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<AwardsPage />)

    const link = screen.getByRole('link', { name: /My Career/i })
    expect(link).toBeInTheDocument()
  })
})
