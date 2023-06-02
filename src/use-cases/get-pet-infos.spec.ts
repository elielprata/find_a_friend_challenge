import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-respository'
import { GetPetInfosUseCase } from './get-pet-infos'

let petsRepository: InMemoryPetsRepository
let sut: GetPetInfosUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetInfosUseCase(petsRepository)

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
    })
  })

  it('should be able to get info of one Pet', async () => {
    const { pet } = await sut.execute({ id: 'pet-01' })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Pet name',
        description: 'test description',
        org_id: 'org-01',
        energy: 4,
        space: 'large',
        size: 1,
        requirements: ['test requirements', 'test requirements'],
        age: 'puppy',
      }),
    )
  })
})
