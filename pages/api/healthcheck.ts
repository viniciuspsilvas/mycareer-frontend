import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send({ status: 'running...', version: process.env.COMMIT_HASH })
}
