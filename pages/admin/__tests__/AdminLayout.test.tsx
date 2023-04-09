import { render, screen } from '@testing-library/react'
import { AdminLayout } from '../AdminLayout'
jest.mock('next-auth/react')
import { useSession } from 'next-auth/react'
import { UserRole } from 'src/generated/graphql'

const mockUseSession = useSession as jest.Mock

describe('AdminLayout', () => {
  test('should render correctly', () => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          firstname: 'Vinicius',
          lastname: 'Silva',
          email: 'viniciuspsilvas@gmail.com',
          password: '$2a$12$Uh940/y1XVEq4s3r9QCn8.XibUcqgiW3I0pIs1xDNsY23FVgd60/.',
          createdAt: new Date(),
          role: UserRole.Admin,
          tokenVersion: 0
        }
      }
    })

    render(<AdminLayout />)

    const text = screen.getByText(/My Career/i)
    expect(text).toBeInTheDocument()
  })
})
