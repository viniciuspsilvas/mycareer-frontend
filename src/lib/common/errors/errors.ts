export enum ClientErrorType {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHENTICATED_TOKEN_ERROR = 'UNAUTHENTICATED_TOKEN_ERROR',
  TECHNICAL_ERROR = 'TECHNICAL_ERROR',
  HANDLED_ERROR = 'HANDLED_ERROR'
}

export interface ClientErrorFields {
  type: ClientErrorType
  message: string
  stack?: string
  status?: string
}

export class ClientError extends Error {
  type: ClientErrorType
  status?: string
  constructor(type: ClientErrorType, message: string, stack?: string, status?: string) {
    super(message)
    Object.setPrototypeOf(this, ClientError.prototype)
    this.name = 'CLIENT_ERROR'
    this.type = type
    this.stack = stack
    this.status = status
  }
}
export class AuthenticationError extends Error {
  type: ClientErrorType = ClientErrorType.UNAUTHENTICATED
  constructor(message = 'Authentication Error', stack?: string) {
    super(message)
    Object.setPrototypeOf(this, AuthenticationError.prototype)
    this.name = 'AUTHENTICATION_ERROR'
    this.stack = stack
  }
}
export class AuthenticationTokenError extends Error {
  type: ClientErrorType = ClientErrorType.UNAUTHENTICATED_TOKEN_ERROR
  constructor(message = 'Refresh token error', stack?: string) {
    super(message)
    Object.setPrototypeOf(this, AuthenticationTokenError.prototype)
    this.name = 'UNAUTHENTICATED_TOKEN_ERROR'
    this.stack = stack
  }
}
