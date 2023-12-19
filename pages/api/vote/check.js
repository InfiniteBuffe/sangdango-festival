import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ status: 405, message: 'Method Not Allowed' })
    return
  }
  const id = req.body.vote_id
  if (id == undefined || id == '') {
    res.status(200)
      .send({
        active: false,
      })
    return
  }
  const findVote = await client.vote_template.findMany({
    where: {
      id: id,
    }
  })

  if (findVote[0] == undefined) {
    res
      .status(200)
      .send({
        active: false,
      })
    return
  }

  res
    .status(200)
    .send({
      active: findVote[0].active,
    })
  return
}
