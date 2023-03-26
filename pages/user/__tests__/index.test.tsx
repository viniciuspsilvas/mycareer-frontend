import { render } from '@testing-library/react'
import UserAdminPage from '../index'

describe('UserAdminPage', () => {
  test('renders UserAdminPage unchanged', () => {
    const { container } = render(<UserAdminPage />)
    expect(container).toMatchSnapshot()
  })
})
