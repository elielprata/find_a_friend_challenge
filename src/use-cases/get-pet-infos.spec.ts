import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-respository'
import { GetPetInfosUseCase } from './get-pet-infos'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetInfosUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetInfosUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
      name: 'Officer name',
      email: 'test@test.com',
      password_hash: 'test',
      postal_code: 'test',
      address: 'test',
      whats_app: 'test',
      latitude: 65164,
      longitude: 65464,
    })

    await petsRepository.create({
      id: 'pet-01',
      name: 'Pet name',
      description: 'test description',
      org_id: 'org-01',
      energy: 4,
      space: 'large',
      size: 1,
      requirements: JSON.stringify(['test requirements', 'test requirements']),
      age: 'puppy',
      city: 'test',
      is_adopted: false,
    })
  })

  it('should be able to get info of one Pet', async () => {
    const { pet } = await sut.execute({ id: 'pet-01' })

    expect(pet).toEqual(
      expect.objectContaining({
        id: 'pet-01',
        name: 'Pet name',
        description: 'test description',
        org_id: 'org-01',
        energy: 4,
        space: 'large',
        size: 1,
        requirements: ['test requirements', 'test requirements'],
        age: 'puppy',
        city: 'test',
      }),
    )
  })
})
