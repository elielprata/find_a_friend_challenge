import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
      name: 'Officer name',
      email: 'test@test.com',
      password_hash: await hash('test', 6),
      postal_code: 'test',
      address: 'test',
      whats_app: 'test',
      latitude: 65164,
      longitude: 65464,
    })
  })

  it('should be able to login with an Org', async () => {
    const { org } = await sut.execute({
      email: 'test@test.com',
      password: 'test',
    })

    expect(org).toEqual(expect.objectContaining({ name: 'Officer name' }))
  })

  it('should be able to return erro when invalid credentials', async () => {
    expect(async () => {
      await sut.execute({
        email: 'test@test.com',
        password: 'test12',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
