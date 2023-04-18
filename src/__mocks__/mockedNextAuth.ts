import { rest } from 'msw'

export const nextAuthMocked = rest.get('/api/auth/session', async (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      user: {
        email: 'viniciuspsilvas@gmail.com',
        sub: 'bd9a449e-5e17-491c-8cc2-979d2cf0d86c',
        id: 'bd9a449e-5e17-491c-8cc2-979d2cf0d86c',
        firstname: 'Vinicius',
        lastname: 'Silva',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlhNDQ5ZS01ZTE3LTQ5MWMtOGNjMi05NzlkMmNmMGQ4NmMiLCJpYXQiOjE2ODExMjQ5ODMsImV4cCI6MTY4MTEyNTg4M30.YT0yMAxJBHh6lYqxQ6mQ_CRTjgNKBSR7AFhkTJwhe_Y',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlhNDQ5ZS01ZTE3LTQ5MWMtOGNjMi05NzlkMmNmMGQ4NmMiLCJ0b2tlblZlcnNpb24iOjAsImlhdCI6MTY4MTEyNDk4MywiZXhwIjoxNjgxNzI5NzgzfQ.IgtBr6TSCyHJKuBkrG7_ou16F8RwnCOUf0AgygVV7ZM',
        role: 'ADMIN',
        iat: 1681125157,
        exp: 1683717157,
        jti: '230f841e-a746-48fc-bc91-d9d56060669c'
      },
      expires: '2023-05-10T11:13:08.643Z'
    })
  )
)
