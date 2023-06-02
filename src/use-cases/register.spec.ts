import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'
import { AddressNeedsToBeInformed } from './errors/address-needs-to-be-informed'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
      name: 'Officer name',
      email: 'test@test.com',
      password: 'test',
      postalCode: 'test',
      address: 'test',
      city: 'test',
      whatsApp: 'test',
      latitude: 65164,
      longitude: 65464,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Officer name',
      email: 'test@test.com',
      password: 'test',
      postalCode: 'test',
      address: 'test',
      city: 'test',
      whatsApp: 'test',
      latitude: 65164,
      longitude: 65464,
    })

    const isPasswordCorrectlyHashed = await compare('test', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email', async () => {
    const email = 'test@test.com'

    await sut.execute({
      name: 'Officer name',
      email,
      password: 'test',
      postalCode: 'test',
      address: 'test',
      city: 'test',
      whatsApp: 'test',
      latitude: 65164,
      longitude: 65464,
    })

    await expect(async () => {
      await sut.execute({
        name: 'Officer name',
        email,
        password: 'test',
        postalCode: 'test',
        address: 'test',
        city: 'test',
        whatsApp: 'test',
        latitude: 65164,
        longitude: 65464,
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able to register when address or password to be without data', async () => {
    const email = 'test@test.com'

    await expect(async () => {
      await sut.execute({
        name: 'Officer name',
        email,
        password: 'test',
        postalCode: 'test',
        address: '',
        city: 'test',
        whatsApp: 'test',
        latitude: 65164,
        longitude: 65464,
      })
    }).rejects.toBeInstanceOf(AddressNeedsToBeInformed)
  })
})
