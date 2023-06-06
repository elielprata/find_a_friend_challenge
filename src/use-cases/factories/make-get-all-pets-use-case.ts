import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetAllPetsUseCase } from '../get-all-pets'

export function makeGetAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetAllPetsUseCase(petsRepository)

  return useCase
}
