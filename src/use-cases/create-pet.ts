import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  orgId: string
  energy: number
  space: string
  size: number
  requirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    orgId,
    energy,
    space,
    size,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const OrgExists = await this.orgsRepository.findById(orgId)

    console.log(OrgExists, orgId)
    if (!OrgExists) {
      throw new ResourceNotFound()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      org_id: orgId,
      energy,
      space,
      size,
      requirements,
    })

    return { pet }
  }
}
