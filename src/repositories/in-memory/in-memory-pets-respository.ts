import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      org_id: data.org_id,
      energy: data.energy,
      space: data.space,
      size: data.size,
      requirements: data.requirements,
    }

    this.pets.push(pet)

    return pet
  }
}
