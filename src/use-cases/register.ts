import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists'
import { WhatsAppNeedsToBeInformed } from './errors/whats-app-needs-to-be-informed'
import { AddressNeedsToBeInformed } from './errors/address-needs-to-be-informed'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  postalCode: string
  address: string
  whatsApp: string
  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    postalCode,
    address,
    whatsApp,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    if (whatsApp.trim().length === 0) {
      throw new WhatsAppNeedsToBeInformed()
    }

    if (address.trim().length === 0) {
      throw new AddressNeedsToBeInformed()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      postal_code: postalCode,
      address,
      whats_app: whatsApp,
      latitude,
      longitude,
    })

    return { org }
  }
}
