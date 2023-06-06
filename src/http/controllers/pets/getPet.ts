import { makeGetPetInfosUseCase } from '@/use-cases/factories/make-get-pet-infos-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamsSchema.parse(request.params)

  const getPetInfosUseCase = makeGetPetInfosUseCase()

  const pet = await getPetInfosUseCase.execute({ id })

  return reply.status(200).send(pet)
}
