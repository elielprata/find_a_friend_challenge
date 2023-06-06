import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Org Test',
      email: 'org1@test.com',
      password_hash: await hash('123456', 6),
      postal_code: '12345-678',
      address: 'street test, number 1',
      whats_app: '00999990000',
      latitude: 28.2144755,
      longitude: -82.0035679,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org1@test.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
