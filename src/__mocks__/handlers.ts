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

export const handlers = [
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
