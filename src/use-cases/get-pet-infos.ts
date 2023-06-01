import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetInfosUseCaseRequest {
  id: string
}

export class GetPetInfosUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetInfosUseCaseRequest) {
    const pet = await this.petsRepository.findById(id)

    return { pet }
  }
}
