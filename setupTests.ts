// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { worker } from 'src/__mocks__/server'

// ###############     NEXT JS config mock     ######################
jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    JWT_SECRET: 'secret',
    JWT_SUBJECT: 'subject'
  },
  publicRuntimeConfig: {
    DEPLOY_ENV: 'test',
    NEXT_PUBLIC_API_URL: 'http://localhost:4000/'
  }
}))

// ###############     END - NEXT JS config mock     ######################

// ###############     MOCK SESSION next-auth     ######################
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      firstname: 'Vinicius',
      lastname: 'Silva',
      email: 'viniciuspsilvas@gmail.com',
      createdAt: new Date(),
      role: 'admin',
      tokenVersion: 0
    }
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    }),
    getSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    })
  }
})

// ###############    END -  MOCK SESSION next-auth     ######################

// ###############     MOCKING SERVICES     ######################
jest.mock('next/router', () => require('next-router-mock'))

// Establish API mocking before all tests.
beforeAll(() => worker.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => worker.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => worker.close())
