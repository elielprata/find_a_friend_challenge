import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetInfosUseCase } from '../get-pet-infos'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetPetInfosUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetPetInfosUseCase(petsRepository, orgsRepository)

  return useCase
}
