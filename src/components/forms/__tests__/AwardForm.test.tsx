import { render, screen } from '@testing-library/react'
import { Award } from 'src/generated/graphql'
import { awards } from 'src/__mocks__/data'
import { AwardForm } from '../AwardForm'

describe('AwardForm', () => {
  test('should render correctly', () => {
    const handlerSubmit = jest.fn()
    render(<AwardForm onSubmit={handlerSubmit} />)
    expect(
      screen.getByRole('heading', {
        name: /award/i
      })
    )

    expect(screen.getByLabelText('Title')).toBeInTheDocument
    expect(screen.getByLabelText('Description')).toBeInTheDocument

    expect(
      screen.getByRole('button', {
        name: 'Submit'
      })
    ).toBeInTheDocument

    expect(
      screen.getByRole('button', {
        name: 'Reset'
      })
    ).toBeInTheDocument

    expect(
      screen.getByRole('button', {
        name: 'Back'
      })
    ).toBeInTheDocument
  })

  test('should render correctly with props', () => {
    // Check if the fields are being loaded correctly when the item is set
    const award: Award = awards.awards[0]

    const handlerSubmit = jest.fn()

    render(<AwardForm data={award} onSubmit={handlerSubmit} />)
  })

  test('should the Reset button clean all fields and validations messages', () => {})

  test('should the Back button redirect to the previous page', () => {})
})
