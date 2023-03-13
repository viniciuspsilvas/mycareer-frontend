import { render } from '@testing-library/react'
import AdminPage from '../index'

describe('AdminPage', () => {
  test('renders AdminPage unchanged', () => {
    const { container } = render(<AdminPage />)
    expect(container).toMatchSnapshot()
  })
})
