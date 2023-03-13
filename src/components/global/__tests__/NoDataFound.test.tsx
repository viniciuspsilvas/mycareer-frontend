import { render, screen } from '@testing-library/react'
import { NoDataFound } from '../NoDataFound'

describe('NoDataFound', () => {
  test('renders NoDataFound default props', () => {
    render(<NoDataFound />)
    expect(screen.getByText(/No data found/i))
  })

  test('renders NoDataFound default props', () => {
    const text = 'Nothing found'

    render(<NoDataFound text={text} />)
    expect(screen.getByText(text))
  })
})
