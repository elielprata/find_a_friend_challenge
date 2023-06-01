import { beforeEach, describe, expect, it } from 'vitest'

import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-respository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFound } from './errors/resource-not-found'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)

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
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet name',
      description: 'test description',
      orgId: 'org-01',
      energy: 4,
      space: 'large',
      size: 1,
      requirements: JSON.stringify(['test requirements', 'test requirements']),
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to return error when org not exists', async () => {
    await expect(async () => {
      await sut.execute({
        name: 'Pet name',
        description: 'test description',
        orgId: '',
        energy: 4,
        space: 'large',
        size: 1,
        requirements: JSON.stringify([
          'test requirements',
          'test requirements',
        ]),
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
