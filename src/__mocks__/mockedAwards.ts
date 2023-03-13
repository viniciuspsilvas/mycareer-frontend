import { graphql } from 'msw'
import { awards } from './data'

// TODO: move this file to Awards mocks
export const awardQueryMocked = graphql.query('Award', (_, res, ctx) => res(ctx.data({ award: awards.awards[0] })))

export const awardQueryErrorMocked = graphql.query('Award', (_, res, ctx) =>
  res(
    ctx.errors([
      {
        message: 'Failed to get Award',
        locations: [
          {
            line: 8,
            column: 12
          }
        ]
      }
    ])
  )
)

export const awardsQueryMocked = graphql.query('Awards', (_, res, ctx) => res(ctx.data(awards)))

export const awardsLoadingMocked = graphql.query('Awards', (_, res, ctx) => res(ctx.delay('infinite')))

export const awardsEmptyMocked = graphql.query('Awards', (_, res, ctx) => res(ctx.data({ awards: [] })))

export const createOneAwardMocked = graphql.mutation('createOneAward', (_, res, ctx) =>
  res(ctx.data({ award: awards.awards[0] }))
)

export const updateOneAwardMocked = graphql.mutation('updateOneAward', (_, res, ctx) =>
  res(ctx.data({ award: awards.awards[0] }))
)

export const deleteOneAwardMocked = graphql.mutation('deleteOneAward', (_, res, ctx) =>
  res(ctx.data({ award: awards.awards[0] }))
)
