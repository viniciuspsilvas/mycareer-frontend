import { render, screen } from '@testing-library/react'
import { Loading } from '../Loading'

describe('Loading', () => {
  test('renders Loading default props', () => {
    render(<Loading />)
    expect(screen.getByText(/loading/i))
  })
})
