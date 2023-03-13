import { render, screen } from '@testing-library/react'
import AdminSidebar from '../index'

describe('AdminSidebar', () => {
  test('renders unchanged', () => {
    const { container } = render(<AdminSidebar />)
    expect(container).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<AdminSidebar />)

    const link = screen.getByRole('link', { name: /Awards/i })
    expect(link).toBeInTheDocument()
  })
})
