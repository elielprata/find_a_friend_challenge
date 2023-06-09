import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-respository'
import { GetAllPetsUseCase } from './get-all-pets'
import { CityNotInformed } from './errors/city-not-informed'

let petsRepository: InMemoryPetsRepository
let sut: GetAllPetsUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()

    sut = new GetAllPetsUseCase(petsRepository)

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Pet name 2',
      description: 'test description',
      org_id: 'org-01',
      energy: 5,
      space: 'large',
      size: 3,
      requirements: JSON.stringify(['test requirements', 'test requirements']),
      age: 'puppy',
      city: 'test',
      is_adopted: false,
    })

    await petsRepository.create({
      name: 'Pet name 3',
      description: 'test description',
      org_id: 'org-01',
      energy: 5,
      space: 'large',
      size: 3,
      requirements: JSON.stringify(['test requirements', 'test requirements']),
      age: 'puppy',
      city: 'other',
      is_adopted: false,
    })
  })

  it('should be able to get all Pets', async () => {
    const { pets } = await sut.execute({ city: 'test' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ city: 'test' }),
      expect.objectContaining({ city: 'test' }),
    ])
  })

  it('should be able to return error when city data not exists', async () => {
    expect(async () => {
      await sut.execute({ city: '' })
    }).rejects.toBeInstanceOf(CityNotInformed)
  })

  it('should be able to filter pets by their characteristics', async () => {
    const { pets } = await sut.execute({ city: 'test', energy: 5, size: 3 })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ energy: 5, size: 3 })])
  })
})
