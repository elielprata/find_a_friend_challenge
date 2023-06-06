import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { search } from './search'
import { getPet } from './getPet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)

  app.get('/pets', search)

  app.get('/pets/:id', getPet)
}
