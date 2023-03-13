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

// ###############     MOCKING SERVICES     ######################
jest.mock('next/router', () => require('next-router-mock'))

// Establish API mocking before all tests.
beforeAll(() => worker.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => worker.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => worker.close())
