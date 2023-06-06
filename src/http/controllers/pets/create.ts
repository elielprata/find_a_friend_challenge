import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    energy: z.coerce.number(),
    space: z.string(),
    size: z.coerce.number(),
    requirements: z.string(),
    age: z.string(),
    city: z.string(),
    isAdopted: z.coerce.boolean(),
  })

  const {
    name,
    description,
    age,
    city,
    energy,
    isAdopted,
    requirements,
    size,
    space,
  } = requestBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const pet = await createPetUseCase.execute({
    name,
    description,
    age,
    city,
    energy,
    isAdopted,
    requirements,
    size,
    space,
    orgId: request.user.sub,
  })

  return reply.status(201).send({ pet })
}
