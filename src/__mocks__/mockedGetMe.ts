import { graphql } from 'msw'
import { me } from './data'

export const getMeQueryMocked = graphql.query('Me', (_, res, ctx) => res(ctx.data({ me })))
