import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(prismaRepository)

  return useCase
}
