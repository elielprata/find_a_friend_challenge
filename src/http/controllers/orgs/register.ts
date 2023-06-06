import { AddressNeedsToBeInformed } from '@/use-cases/errors/address-needs-to-be-informed'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'
import { WhatsAppNeedsToBeInformed } from '@/use-cases/errors/whats-app-needs-to-be-informed'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    postalCode: z.string(),
    address: z.string(),
    whatsApp: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const {
    name,
    email,
    password,
    postalCode,
    address,
    whatsApp,
    latitude,
    longitude,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      postalCode,
      address,
      whatsApp,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof WhatsAppNeedsToBeInformed) {
      return reply.status(413).send({ message: error.message })
    }

    if (error instanceof AddressNeedsToBeInformed) {
      return reply.status(413).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
