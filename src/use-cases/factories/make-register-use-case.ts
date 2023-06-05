import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUseCase(prismaRepository)

  return registerUseCase
}
