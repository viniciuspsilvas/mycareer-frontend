import {
  awardQueryMocked,
  awardsEmptyMocked,
  awardsLoadingMocked,
  awardsQueryMocked,
  createOneAwardMocked,
  deleteOneAwardMocked,
  updateOneAwardMocked
} from './mockedAwards'
import { getMeQueryMocked } from './mockedGetMe'
import { nextAuthMocked } from './mockedNextAuth'

export const handlers = [
  nextAuthMocked,
  //
  awardQueryMocked,
  awardsQueryMocked,
  awardsLoadingMocked,
  awardsEmptyMocked,
  createOneAwardMocked,
  updateOneAwardMocked,
  deleteOneAwardMocked,
  //
  getMeQueryMocked
]
