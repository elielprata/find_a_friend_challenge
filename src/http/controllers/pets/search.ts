import { makeGetAllPetsUseCase } from '@/use-cases/factories/make-get-all-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy: z.number().optional(),
    size: z.number().optional(),
  })

  const { city, age, energy, size } = requestParamsSchema.parse(request.query)

  const getAllPetsUseCase = makeGetAllPetsUseCase()

  const pets = await getAllPetsUseCase.execute({ city, age, energy, size })

  return reply.status(200).send(pets)
}
