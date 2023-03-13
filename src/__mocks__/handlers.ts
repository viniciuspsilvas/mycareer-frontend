import {
  awardQueryMocked,
  awardsEmptyMocked,
  awardsLoadingMocked,
  awardsQueryMocked,
  createOneAwardMocked,
  deleteOneAwardMocked,
  updateOneAwardMocked
} from './mockedAwards'

export const handlers = [
  awardQueryMocked,
  awardsQueryMocked,
  awardsLoadingMocked,
  awardsEmptyMocked,
  createOneAwardMocked,
  updateOneAwardMocked,
  deleteOneAwardMocked
]
