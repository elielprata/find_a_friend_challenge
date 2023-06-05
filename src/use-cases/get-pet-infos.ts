import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetPetInfosUseCaseRequest {
  id: string
}

export class GetPetInfosUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({ id }: GetPetInfosUseCaseRequest) {
    const getPet = await this.petsRepository.findById(id)

    if (!getPet) {
      throw new ResourceNotFound()
    }

    const org = await this.orgsRepository.findById(getPet.org_id)

    const pet = {
      ...getPet,
      requirements: JSON.parse(getPet.requirements),
      org,
    }

    return { pet }
  }
}
