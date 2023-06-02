import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetPetInfosUseCaseRequest {
  id: string
}

export class GetPetInfosUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetInfosUseCaseRequest) {
    const getPet = await this.petsRepository.findById(id)

    if (!getPet) {
      throw new ResourceNotFound()
    }

    const pet = { ...getPet, requirements: JSON.parse(getPet.requirements) }

    return { pet }
  }
}
