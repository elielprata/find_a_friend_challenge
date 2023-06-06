import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
