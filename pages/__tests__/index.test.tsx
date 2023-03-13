import { render } from '@testing-library/react'
import Home from '../index'

jest.mock(
  '@components/sections/AwardSection',
  () =>
    function AwardSection() {
      return <div>I am AwardSection</div>
    }
)

describe('Home', () => {
  test('renders Home unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
